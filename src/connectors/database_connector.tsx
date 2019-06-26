import * as DataTypes from '../types';

export default interface DatabaseConnector {
    querryNotifications(
        user: DataTypes.UserType,
        onComplete?: (resultCode: number) => void,
    ): DataTypes.BookPendingNotification[];
    querryBooks(onComplete?: (resultCode: number) => void): DataTypes.BookRecordType[];
    assignBook(index: number, user: DataTypes.UserType, onComplete?: (resultCode: number) => void): void;
    deleteBook(bookKey: string, onComplete?: (resultCode: number) => void): void;
    addBook(data: DataTypes.BookValueType, onComplete?: (resultCode: number) => void): void;
}
