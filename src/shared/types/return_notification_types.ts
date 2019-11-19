import { UserRecordType } from './user_types';

export interface ReturnNotificationRecordType {
    id: number;
    bookId: number;
    userId: number;
    ownerId: number;
}

export interface ReturnNotificationValueType {
    bookId: number;
    userId: number;
    ownerId: number;
}

export interface ReturnNotificationType {
    returnId: number;
    bookId: number;
    bookTitle: string;
    user: UserRecordType;
}
