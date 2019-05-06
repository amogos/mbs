import * as DataTypes from "../types"

export default interface DatabaseConnector {
    getBooks(onComplete: (books: Array<DataTypes.BookRecordType>) => void): void;
    assignBook(key: string, user: DataTypes.UserType, onComplete: (userdata: DataTypes.UserType) => void): void;
    deleteBook(data: DataTypes.BookKeyType, onComplete: () => void): void;
    addBook(data: DataTypes.BookValueType, onComplete: (data: DataTypes.BookValueType, bookKey: string) => void): void;
}