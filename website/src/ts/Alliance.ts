import { Messages } from './Message'
import { Patterns } from './Pattern'
import { Users } from './User'

export interface Alliance {
    summary: string
    CHILD_GROOMING: number
    EXTREMISM: number
    HATE_SPEECH: number
    POLITICS: number
    PUBLIC_THREAT: number
    RELIGIOUS: number
    SENTIMENT: number
    SUBVERSIVE: number
    WEBSITE: number
    alliance_account_summaries: Users
    current_size: number
    filtered: number
    found_patterns: Patterns
    number_patterns_found: number
    protocol: Messages
    risk: number
}

export interface Alliances {
    [id: string]: Alliance
}
