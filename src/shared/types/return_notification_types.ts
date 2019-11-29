import { UserRecordType, NullUserRecordType } from './user_types';

export interface ReturnNotificationRecordType {
    id: number;
    bookId: number;
    userId: number;
    ownerId: number;
}

export const NullReturnNotificationRecordType = (): ReturnNotificationRecordType => {
    return { id: 0, bookId: 0, userId: 0, ownerId: 0 };
};

export interface ReturnNotificationValueType {
    bookId: number;
    userId: number;
    ownerId: number;
}

export const NullReturnNotificationValueType = (): ReturnNotificationValueType => {
    return { bookId: 0, userId: 0, ownerId: 0 };
};

export interface ReturnNotificationType {
    returnId: number;
    bookId: number;
    bookTitle: string;
    user: UserRecordType;
}

export const NullReturnNotificationType = (): ReturnNotificationType => {
    return { returnId: 0, bookId: 0, bookTitle: '', user: NullUserRecordType() };
};
