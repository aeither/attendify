export interface EventInfo {
  data: EventData
  block: Block
}

export interface Block {
  hash: string
}

export interface EventData {
  id: string
  title: string
  encryptPubKey: string
  description: string
  date: string
  location: string
  owner: string
  participants: string[]
}

export interface TicketData {
  id: string
  encryptedData: string
  type: string
  price: number
  quantity: number
  eventTitle: string
  eventId: string
  userId: string
}

export interface UserData {
  encryptPubKey: string
  id: string
  name: string
  points: number
  publicKey: PublicKey
}

export interface PublicKey {
  alg: string
  crv: string
  kty: string
  use: string
  x: string
  y: string
}

export type TicketEncryptedData = {
  tickedId: string
  eventId: string
  eventTitle: string
  address: string
}
