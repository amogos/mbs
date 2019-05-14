import * as DataTypes from "../types"

export default interface DatabaseConnector {
    querryBooks(onComplete?: () => void): Array<DataTypes.BookRecordType>;
    assignBook(index: number, user: DataTypes.UserType, onComplete?: () => void): void;
    deleteBook(bookKey: string, onComplete?: () => void): void;
    addBook(data: DataTypes.BookValueType, onComplete?: () => void): void;
}