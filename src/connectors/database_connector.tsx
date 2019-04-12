import * as Types from "../types"

export default interface DatabaseConnector {
    getBooks(onComplete: (books: Array<Types.BookRecordType>) => void): void;
    assignBook(data: Types.BookKeyType, user: Types.UserType, onComplete: () => void): void;
    deleteBook(data: Types.BookKeyType, onComplete: () => void): void;
    addBook(data: Types.BookValueType, onComplete: (data: Types.BookValueType, bookKey: string) => void): void;
}