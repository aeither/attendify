import { gql } from '@apollo/client'
import { client } from './client'
import {
  AttestationsQuery,
  AttestationsQueryVariables,
  Attestation_OrderBy,
  OrderDirection,
} from './generated'

export const attestationsQuery = gql`
  query Attestations(
    $first: Int = 10
    $orderBy: Attestation_orderBy
    $orderDirection: OrderDirection
    $skip: Int = 0
    $subgraphError: _SubgraphErrorPolicy_! = deny
    $where: Attestation_filter
  ) {
    attestations(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      subgraphError: $subgraphError
      where: $where
    ) {
      id
      creator
      about
      key
      val
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

export function _queryAttestations(variables: AttestationsQueryVariables) {
  return client.query<AttestationsQuery, AttestationsQueryVariables>({
    query: attestationsQuery,
    variables: {
      orderBy: Attestation_OrderBy.Index,
      orderDirection: OrderDirection.Desc,
      ...variables,
    },
  })
}

interface QueryAttestationsArgs {
  creator?: string | null
  key?: string | null
  about?: string | null
}

export function queryAttestations({ creator, about, key }: QueryAttestationsArgs) {
  if (creator) {
    return _queryAttestations({
      where: {
        creator,
      },
    })
  } else if (about) {
    return _queryAttestations({
      where: {
        about,
      },
    })
  } else if (key) {
    return _queryAttestations({
      where: {
        key,
      },
    })
  } else {
    return _queryAttestations({})
  }
}
