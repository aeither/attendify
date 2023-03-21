import { useWaitForTransaction } from 'wagmi'

import {
  useAttestationStationAttest,
  useAttestationStationAttestations,
  usePrepareAttestationStationAttest,
} from '@/generated'
import { createKey, createValue, parseString } from '@/lib/utils/atst'
import { usePBAccount } from './use-polybase'

if (!process.env.NEXT_PUBLIC_SENDER) throw new Error('NEXT_PUBLIC_SENDER not found')
const NEXT_PUBLIC_SENDER = process.env.NEXT_PUBLIC_SENDER as `0x${string}`

type AtstProps = {
  receiver: `0x${string}` | undefined
  eventTitle: string
}

export function useMyAttestations() {
  const key = createKey('attendify')
  const { address } = usePBAccount()

  const me = address! as `0x${string}`

  const { refetch, data: attestations } = useAttestationStationAttestations({
    args: [NEXT_PUBLIC_SENDER!, me!, key],
  })

  return {
    attestations: attestations ? parseString(attestations) : undefined,
    refetch,
  }
}

export function useSendAttestation({ receiver, eventTitle }: AtstProps) {
  const { address: sender } = usePBAccount()

  const key = createKey('attendify')
  const newAttestation = createValue(`${receiver} attended ${eventTitle}`)

  const { config } = usePrepareAttestationStationAttest({
    args: [receiver!, key, newAttestation],
  })

  const { data, writeAsync } = useAttestationStationAttest({
    ...config,
    onSuccess: () => {},
  })

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [sender! as any, receiver!, key],
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
