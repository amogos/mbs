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

export interface Notification {
    type: NotificationType;
    date: number;
}

export interface RequestBookNotification extends Notification {
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}

export interface ReturnBookNotification extends Notification {
    bookId: number;
    userId: number;
    duration: number;
}

export interface JoinSpaceInviteNotification extends Notification {
    spaceId: number;
    userId: number;
}

export type JoinSpaceRequest = JoinSpaceInviteNotification;
