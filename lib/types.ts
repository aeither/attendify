export interface Event {
  data: EventData
  block: Block
}

export interface Block {
  hash: string
}

export interface EventData {
  date: string
  description: string
  id: string
  location: string
  participants: string[]
  title: string
}
