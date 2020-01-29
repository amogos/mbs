import * as DataTypes from './../types';

export enum NotificationType {
    /**User requests to rent a book */
    REQUEST_BOOK,
    /**User returns a rented book */
    RETURN_BOOK,
    /**User gets an invitation to join a space */
    JOIN_SPACE_INVITE,
    /**User sends a request to join a space */
    JOIN_SPACE_REQUEST,
}

export interface AppNotification {
    id?: number;
    type: NotificationType;
    date: number;
    fromUserId: number;
    toUserId: number;
    fromUser?: DataTypes.UserRecordType;
    toUser?: DataTypes.UserRecordType;
}

export interface RequestBookNotification extends AppNotification {
    bookId: number;
    duration: number;
    book?: DataTypes.BookRecordType;
}

export interface ReturnBookNotification extends AppNotification {
    bookId: number;
    duration: number;
    book?: DataTypes.BookRecordType;
}

export interface JoinSpaceInviteNotification extends AppNotification {
    spaceId: number;
    space?: DataTypes.SpaceType;
}

export type JoinSpaceRequest = JoinSpaceInviteNotification;
