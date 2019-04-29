import * as Types from "../types";
import EventBus from '../utils/event_bus'
import Strings from '../constants/string_constant';
import Command from "./command";


export default class RemoveBookCommand implements Command {
    context: Types.Context | undefined;
    data: Types.BookKeyType;
    books: Array<Types.BookRecordType>;

    constructor(data: Types.BookKeyType, books: Array<Types.BookRecordType>) {
        this.data = data;
        this.books = books;
    }

    init(context?: Types.Context): RemoveBookCommand {
        this.context = context;
        return this;
    }

    execute(onComplete?: () => void | undefined): void {
        const key: string | null = this.data.id;

        var onCompleteCallback = () => {
            this.books.forEach((item, index) => {
                if (item.id === key) {
                    this.books.splice(index, 1);
                }
            });

            if (onComplete) {
                onComplete();
            }

            EventBus.getInstance().fireEvent("onOperationCompleted",
                { message: Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM } as Types.ConfirmationDialogParams);

        }
        this.context!.dbconnector.deleteBook(this.data, onCompleteCallback);
    }
}