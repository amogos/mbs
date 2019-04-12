import * as Types from "../types";

export default interface Command {
    init(context?: Types.Context): void;
    execute(onComplete?: Types.CommandCallbackType | undefined): void;
}