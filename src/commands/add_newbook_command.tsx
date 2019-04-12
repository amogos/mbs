import Command from './command';
import * as Types from './../types';
import EventBus from './../utils/event_bus'
import Strings from './../constants/string_constant';

export default class AddNewBookCommand implements Command {
    context: Types.Context | undefined;
    data: Types.BookValueType;
    books: Array<Types.BookRecordType>;

    constructor(data: Types.BookValueType, books: Array<Types.BookRecordType>) {
        this.data = data;
        this.books = books;
    }

    init(context?: Types.Context): AddNewBookCommand {
        this.context = context;
        return this;
    }

    execute(onComplete?: () => void | undefined): void {
        var onCompleteCallback = (newEntry: Types.BookValueType, bookKey: string) => {
            EventBus.getInstance().fireEvent("onOperationCompleted",
                { message: Strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM } as Types.ConfirmationDialogParams)
            this.books.push({ id: bookKey, value: newEntry } as Types.BookRecordType);
        }
        this.context!.dbconnector.addBook(this.data, onCompleteCallback);
    }
}