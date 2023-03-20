// import { createKey, createValue, parseString } from '@eth-optimism/atst'
import { useState } from 'react'
import { useAccount, useNetwork, useWaitForTransaction } from 'wagmi'

import { createKey, createValue, parseString } from '@/lib/utils/atst'
import Typography from '@mui/material/Typography'
import { ConnectKitButton } from 'connectkit'
import {
  useAttestationStationAttest,
  useAttestationStationAttestations,
  usePrepareAttestationStationAttest,
} from '../generated'
import { toast } from 'sonner'

type AttestProps = {
  setDecryptedContent: (value: React.SetStateAction<string | undefined>) => void
}

export function Attest(props: AttestProps) {
  const { setDecryptedContent } = props

  const { address } = useAccount()
  const [value, setValue] = useState('Hello world')

  const key = createKey('hello-world')
  const newAttestation = createValue(value)

  const { config } = usePrepareAttestationStationAttest({
    args: [address!, key, newAttestation],
  })

  const { data, write } = useAttestationStationAttest({
    ...config,
    onSuccess: () => {
      setDecryptedContent(undefined)
      toast.success('Success')
    },
  })

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [address!, address!, key],
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  })

  return (
    <div className="flex w-full flex-col gap-2">
      <Typography gutterBottom variant="h2" component="div">
        Attest
      </Typography>
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
