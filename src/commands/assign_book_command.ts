import * as Types from "../types";
import Command from "./command";


export default class AssignBookCommand implements Command {
    context: Types.Context | undefined;
    data: Types.BookKeyType;
    books: Array<Types.BookRecordType>;

    constructor(data: Types.BookKeyType, books: Array<Types.BookRecordType>) {
        this.data = data;
        this.books = books;
    }

    init(context?: Types.Context): AssignBookCommand {
        this.context = context;
        return this;
    }

    execute(onComplete?: () => void | undefined): void {
        const key: string | null = this.data.id;

        var onCompleteCallback = () => {

            var index = this.books.findIndex(function (item: Types.BookRecordType) {
                return item.id === key;
            });

            this.books[index].value.holder = this.context!.userdata;

            if (onComplete) {
                onComplete();
            }

        }
       // this.context!.dbconnector.assignBook(this.data, this.context!.userdata, onCompleteCallback);
    }
}