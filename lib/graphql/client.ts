import { ApolloClient, InMemoryCache } from '@apollo/client'
import { uris } from '../constants'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: uris.graph,
})
