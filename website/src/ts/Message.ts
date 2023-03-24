export interface Message {
    alliance_id: string
    author: string
    content: string
    isAction: boolean
    risk: number
    timestamp: number
}

export interface Messages {
    [messageIndex: number]: Message
}
