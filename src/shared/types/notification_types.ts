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
}

export interface RequestBookNotification extends AppNotification {
    bookId: number;
    duration: number;
}

export interface ReturnBookNotification extends Notification {
    bookId: number;
    duration: number;
}

export interface JoinSpaceInviteNotification extends Notification {
    spaceId: number;
}

export type JoinSpaceRequest = JoinSpaceInviteNotification;
