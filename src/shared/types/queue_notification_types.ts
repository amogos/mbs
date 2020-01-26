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

export const NullQueueNotificationValue = (): QueueNotificationValueType => {
    return { userId: 0, ownerId: 0, bookId: 0, duration: 0 };
};

export interface QueueNotificationRecordType {
    id: number;
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}

export const NullQueueNotificationRecordType = (): QueueNotificationRecordType => {
    return { id: 0, bookId: 0, userId: 0, ownerId: 0, duration: 0 };
};

export const ToNotificationRecordType = (data: QueueNotificationType): QueueNotificationRecordType => {
    const result = NullQueueNotificationRecordType();
    result.id = data.id;
    result.bookId = data.bookId;
    result.userId = data.user.id;
    result.ownerId = data.ownerId;
    result.duration = data.duration;
    return result;
};
