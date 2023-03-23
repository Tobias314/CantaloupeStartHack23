import { Alliance } from './Alliance'
import { Rules } from './Rules'

export interface Violation {
    theViolation: Rules
    certainty: number
    summary: string
    happenedIn: Alliance
}
