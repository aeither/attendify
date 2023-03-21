import { useNetwork } from 'wagmi'

import { useSendAttestation } from '@/lib/hooks/use-atst'
import { TicketEncryptedData } from '@/lib/types'
import { parseString } from '@/lib/utils/atst'
import Button from '@mui/material/Button'
import { ConnectKitButton } from 'connectkit'
import { toast } from 'sonner'

type AttestProps = {
  setDecryptedContent: React.Dispatch<
    React.SetStateAction<TicketEncryptedData | undefined>
  >
  decryptedContent: TicketEncryptedData
}

export function Attest(props: AttestProps) {
  const { setDecryptedContent, decryptedContent } = props

  const ethAddress = decryptedContent.address as `0x${string}`

  const { attestation, isLoading, writeAsync } = useSendAttestation({
    receiver: ethAddress,
    eventTitle: decryptedContent.eventTitle,
    eventId: decryptedContent.eventId,
  })

  return (
    <>
      <ConnectKitButton />
      <div>Last attestation: {attestation ? parseString(attestation) : 'none'}</div>
      <Button
        variant="contained"
        disabled={!writeAsync || isLoading}
        onClick={async () => {
          await writeAsync?.()

          setDecryptedContent(undefined)
          toast.success('Success')
        }}
      >
        Attest
      </Button>

      {/* {isLoading && <ProcessingMessage hash={data?.hash} />}
      <div>
        Gas fee: <span>{config.request?.gasLimit.toString()}</span>
      </div> */}
    </>
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
