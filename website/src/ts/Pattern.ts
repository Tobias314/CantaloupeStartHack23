export interface Pattern {
    join_hate_kick_regex: number[]
}

export interface Patterns {
    [userId: string]: Pattern
}
