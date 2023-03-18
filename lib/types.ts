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
  description: string
  date: string
  location: string
  owner: string
  participants: string[]
}

export interface TicketData {
  id: string
  type: string
  price: number
  quantity: number
  eventTitle: string
  eventId: string
  userId: string
}
