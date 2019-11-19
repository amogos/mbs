import { UserRecordType } from './user_types';

export interface QueueNotificationType {
    id: number;
    user: UserRecordType;
    ownerId: number;
    bookTitle: string;
    bookId: number;
    duration: number;
}

export interface QueueNotificationValueType {
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}

export const NullQueueNotificationValue: QueueNotificationValueType = {
    userId: 0,
    ownerId: 0,
    bookId: 0,
    duration: 0,
};

export interface QueueNotificationRecordType {
    id: number;
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}
