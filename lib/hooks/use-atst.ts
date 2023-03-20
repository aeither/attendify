import { useAccount, useWaitForTransaction } from 'wagmi'

import {
  useAttestationStationAttest,
  useAttestationStationAttestations,
  usePrepareAttestationStationAttest,
} from '@/generated'
import { createKey, createValue } from '@/lib/utils/atst'

type AtstProps = {
  receiver: `0x${string}` | undefined
  eventId: string
}

export function useAtst({ receiver, eventId }: AtstProps) {
  const { address: sender } = useAccount()

  const key = createKey('attendify')
  const newAttestation = createValue(`${eventId}: ${receiver}`)

  const { config } = usePrepareAttestationStationAttest({
    args: [receiver!, key, newAttestation],
  })

  const { data, writeAsync } = useAttestationStationAttest({
    ...config,
    onSuccess: () => {},
  })

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [sender!, receiver!, key],
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  })

  return {
    isLoading,
    writeAsync,
    attestation,
  }
}
