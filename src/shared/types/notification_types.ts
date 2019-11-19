import { UserRecordType } from './user_types';

export interface QueueNotificationRecordType {
    id: number;
    user: UserRecordType;
    ownerId: number;
    bookTitle: string;
    bookId: number;
    duration: number;
}

export const NullQueueNotificationValue: QueueNotificationType = {
    userId: 0,
    ownerId: 0,
    bookId: 0,
    duration: 0,
};

export interface QueueNotificationType {
    userId: number;
    ownerId: 0;
    bookId: number;
    duration: number;
}

export interface ReturnRecordType {
    id: number;
    bookId: number;
    userId: number;
    ownerId: number;
}

export interface ReturnValueType {
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

export interface QueueValueType {
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}

export interface QueueRecordType {
    id: number;
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}
