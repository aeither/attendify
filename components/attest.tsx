import { useNetwork } from 'wagmi'

import { useAtst } from '@/lib/hooks/use-atst'
import { parseString } from '@/lib/utils/atst'
import Button from '@mui/material/Button'
import { ConnectKitButton } from 'connectkit'
import { toast } from 'sonner'
import { TicketEncryptedData } from '@/lib/types'

type AttestProps = {
  setDecryptedContent: React.Dispatch<
    React.SetStateAction<TicketEncryptedData | undefined>
  >
  decryptedContent: TicketEncryptedData
}

export function Attest(props: AttestProps) {
  const { setDecryptedContent, decryptedContent } = props

  // TODO temp solution
  const ethAddress = decryptedContent.address.slice(0, 42) as any

  const { attestation, isLoading, writeAsync } = useAtst({
    eventId: decryptedContent.eventId,
    receiver: ethAddress,
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
