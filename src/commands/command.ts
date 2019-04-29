import * as Types from "../types";
export function something() { }
export default interface Command {
    init(context?: Types.Context): void;
    execute(onComplete?: () => void | undefined): void;
}