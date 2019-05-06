import * as Types from "../types";
import Command from "./command";


export default class ReturnBookCommand implements Command {
    context: Types.Context | undefined;
    data: Types.BookKeyType;
    books: Array<Types.BookRecordType>;

    constructor(data: Types.BookKeyType, books: Array<Types.BookRecordType>) {
        this.data = data;
        this.books = books;
    }

    init(context?: Types.Context): ReturnBookCommand {
        this.context = context;
        return this;
    }

    execute(onComplete?: () => void | undefined): void {
        const key: string | null = this.data.id;
        var index = this.books.findIndex(function (item: Types.BookRecordType) {
            return item.id === key;
        });
        var onCompleteCallback = () => {
            this.books[index].value.holder = this.books[index].value.owner;
            if (onComplete) {
                onComplete();
            }
        }
        //this.context!.dbconnector.assignBook(this.data, this.books[index].value.holder, onCompleteCallback);
    }
}