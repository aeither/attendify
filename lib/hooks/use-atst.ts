import { useWaitForTransaction } from 'wagmi'

import {
  useAttestationStationAttest,
  useAttestationStationAttestations,
  usePrepareAttestationStationAttest,
} from '@/generated'
import { createKey, createValue } from '@/lib/utils/atst'
import { ApolloQueryResult } from '@apollo/client'
import { useEffect, useState } from 'react'
import { AttestationsQuery } from '../graphql/generated'
import { queryAttestations } from '../graphql/queries'
import { usePBAccount } from './use-polybase'

type AtstProps = {
  receiver: `0x${string}` | undefined
  eventTitle: string
  eventId: string
}

export function useReceivedAttestations(address: string | string[] | null | undefined) {
  // const key = createKey('attendify')
  const [myAttestations, setMyAttestations] =
    useState<ApolloQueryResult<AttestationsQuery>>()

  const queryMyAtsts = async () => {
    if (!address) {
      return
    }

    const attestations = await queryAttestations({
      about: '0xb637f3242e7fc2d23a4c485cd2d5ef91d23b2de7', // TODO change to address,
    })

    setMyAttestations(attestations)
  }
  useEffect(() => {
    queryMyAtsts()
  }, [address])

  return {
    data: myAttestations?.data,
    error: myAttestations?.error,
    loading: myAttestations?.loading,
  }
}

export function useGivenAttestations(address: string | string[] | null | undefined) {
  // const key = createKey('attendify')
  const [myAttestations, setMyAttestations] =
    useState<ApolloQueryResult<AttestationsQuery>>()

  const queryMyAtsts = async () => {
    if (!address) {
      return
    }

    const attestations = await queryAttestations({
      creator: '0x33413c433dd28c5e0a90cba7b0a6f98d3ab971fb', // TODO change to address,
    })

    setMyAttestations(attestations)
  }
  useEffect(() => {
    queryMyAtsts()
  }, [address])

  return {
    data: myAttestations?.data,
    error: myAttestations?.error,
    loading: myAttestations?.loading,
  }
}

export function useSendAttestation({ receiver, eventTitle, eventId }: AtstProps) {
  const { address: sender } = usePBAccount()

  const key = createKey(`attendify:${eventId}`)
  const newAttestation = createValue(`Attended ${eventTitle}`)

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
