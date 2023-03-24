import { Alliance } from './Alliance'
import { Patterns } from './Pattern'

export interface Violation {
    theViolations: Patterns
    summary: string
    alliance_id: string
    happenedIn: Alliance
}
