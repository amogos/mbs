export const UserFeedType = {
    INVALID: 0,
    LIKES_BOOK: 1,
    RATED_BOOK: 2,
    RENTED_BOOK: 3,
    REQUESTED_BOOK: 4,
    ADDED_BOOK: 5,
    FOLLOWING_SPACE: 6,
    REMOVED_BOOK: 7,
};

export interface UserFeedValueType {
    type: number;
    book?: number;
    space?: number;
    isbn10?: string;
    isbn13?: string;
    date: number;
}

export const NullUserFeedValueType = (): UserFeedValueType => {
    return { type: UserFeedType.INVALID, date: 0 };
};

export interface UserFeedRecordType {
    id: number;
    type: number;
    book?: number;
    space?: number;
    isbn10?: string;
    isbn13?: string;
    date: number;
}

export const NullUserFeedRecordType = (): UserFeedRecordType => {
    return { id: 0, type: UserFeedType.INVALID, date: 0 };
};

export const UserFeedISBNEvent = (isbn10: string, isbn13: string, event: number): UserFeedValueType => {
    const userFeed = NullUserFeedValueType();
    userFeed.type = event;
    userFeed.isbn10 = isbn10;
    userFeed.isbn13 = isbn13;
    userFeed.date = Date.now();
    return userFeed;
};

export const UserFeedBookEvent = (bookId: number, event: number): UserFeedValueType => {
    const userFeed = NullUserFeedValueType();
    userFeed.type = event;
    userFeed.book = bookId;
    userFeed.date = Date.now();
    return userFeed;
};

export const UserFeedSpaceEvent = (spaceId: number, event: number): UserFeedValueType => {
    const userFeed = NullUserFeedValueType();
    userFeed.type = event;
    userFeed.space = spaceId;
    userFeed.date = Date.now();
    return userFeed;
};
