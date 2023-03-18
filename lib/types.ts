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
