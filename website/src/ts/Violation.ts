import { Alliance } from './Alliance'
import { Rules } from './Rules'

export interface Violation {
    theViolation: Rules
    summary: string
    happenedIn: Alliance
}
