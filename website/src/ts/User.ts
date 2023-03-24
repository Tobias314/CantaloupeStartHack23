export interface User {
    level: number
    revenue_today: number
    revenue: number
    session_duration_today: number
    session_duration: number
    time_existent: number
    risk: number
    HATE_SPEECH: number
    RELIGIOUS: number
    WEBSITE: number
    CHILD_GROOMING: number
    PUBLIC_THREAT: number
    EXTREMISM: number
    SUBVERSIVE: number
    SENTIMENT: number
    POLITICS: number
    filtered_total: number
}

export interface Users {
    [id: string]: User
}
