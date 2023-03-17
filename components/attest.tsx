// import { createKey, createValue, parseString } from '@eth-optimism/atst'
import { useState } from 'react'
import { useAccount, useNetwork, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
import { toUtf8String } from 'ethers/lib/utils.js'

import { ConnectKitButton } from 'connectkit'
import {
  useAttestationStationAttest,
  useAttestationStationAttestations,
  usePrepareAttestationStationAttest,
} from '../generated'
import { Address } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { hexlify, isAddress, isHexString, toUtf8Bytes } from 'ethers/lib/utils.js'

export type WagmiBytes = `0x${string}`
export const createKey = (rawKey: string): WagmiBytes => {
  if (rawKey.length < 32) {
    return ethers.utils.formatBytes32String(rawKey) as WagmiBytes
  }
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(rawKey))
  return (hash.slice(0, 64) + 'ff') as WagmiBytes
}

export const createValue = (
  bytes: WagmiBytes | string | Address | number | boolean | BigNumber,
): WagmiBytes => {
  bytes = bytes === '0x' ? '0x0' : bytes
  if (BigNumber.isBigNumber(bytes)) {
    return bytes.toHexString() as WagmiBytes
  }
  if (typeof bytes === 'number') {
    return BigNumber.from(bytes).toHexString() as WagmiBytes
  }
  if (typeof bytes === 'boolean') {
    return bytes ? '0x1' : '0x0'
  }
  if (isAddress(bytes)) {
    return bytes
  }
  if (isHexString(bytes)) {
    return bytes as WagmiBytes
  }
  if (typeof bytes === 'string') {
    return hexlify(toUtf8Bytes(bytes)) as WagmiBytes
  }
  throw new Error(`unrecognized bytes type ${bytes satisfies never}`)
}

export const parseString = (rawAttestation: WagmiBytes): string => {
  rawAttestation = rawAttestation === '0x0' ? '0x' : rawAttestation
  return rawAttestation ? toUtf8String(rawAttestation) : ''
}

export function Attest() {
  const { address } = useAccount()
  const [value, setValue] = useState('Hello world')

  /**
   * The key of the attestation
   * @see https://www.npmjs.com/package/@eth-optimism/atst
   */
  const key = createKey('hello-world')

  const newAttestation = createValue(value)

  const { config } = usePrepareAttestationStationAttest({
    args: [address!, key, newAttestation],
  })

  const { data, write } = useAttestationStationAttest({
    ...config,
    onSuccess: () => setValue(''),
  })

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [address!, address!, key],
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  })

  return (
    <div>
      <h2>Attestoooooor</h2>
      <ConnectKitButton />
      <div>Current attestation: {attestation ? parseString(attestation) : 'none'}</div>
      <input
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        Attest
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      <div>
        Gas fee: <span>{config.request?.gasLimit.toString()}</span>
      </div>
    </div>
  )
}

function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork()
  const etherscan = chain?.blockExplorers?.etherscan
  return (
    <span>
      Processing transaction...{' '}
      {etherscan && <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>}
    </span>
  )
}
