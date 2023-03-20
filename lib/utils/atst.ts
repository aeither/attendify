import { ethers } from 'ethers'
import { toUtf8String } from 'ethers/lib/utils.js'

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
