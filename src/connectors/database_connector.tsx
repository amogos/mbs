import * as DataTypes from "../types"

export default interface DatabaseConnector {
    getBooks(): Array<DataTypes.BookRecordType>;
    assignBook(index: number, user: DataTypes.UserType): void;
    deleteBook(data: DataTypes.BookKeyType, onComplete: () => void): void;
    addBook(data: DataTypes.BookValueType, onComplete: (data: DataTypes.BookValueType, bookKey: string) => void): void;
}