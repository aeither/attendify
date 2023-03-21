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
    $block: Block_height
    $first: Int = 10
    $orderBy: Attestation_orderBy
    $orderDirection: OrderDirection
    $skip: Int = 0
    $subgraphError: _SubgraphErrorPolicy_! = deny
    $where: Attestation_filter
  ) {
    attestations(
      block: $block
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
      index
      indexForCreator
      indexForAbout
      indexForKey
      indexForKeyAndCreator
      indexForKeyAndAbout
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
  key?: string | null
  address?: string | null
  count: number
  page: number
  rows: number
}

export function queryAttestations({
  key,
  address,
  page,
  rows,
  count,
}: QueryAttestationsArgs) {
  const offset = page * rows
  const start = (count - offset).toString()

  if (address && key) {
    return _queryAttestations({
      first: rows,
      where: {
        or: [
          { about: address, indexForKeyAndAbout_lte: start, key },
          { creator: address, indexForKeyAndCreator_lte: start, key },
        ],
      },
    })
  } else if (address) {
    return _queryAttestations({
      first: rows,
      where: {
        or: [
          { about: address, indexForAbout_lte: start },
          { creator: address, indexForCreator_lte: start },
        ],
      },
    })
  } else if (key) {
    return _queryAttestations({
      first: rows,
      where: {
        and: [{ indexForKey_lte: start }, { key }],
      },
    })
  } else {
    return _queryAttestations({
      first: rows,
      where: {
        index_lte: start,
      },
    })
  }
}