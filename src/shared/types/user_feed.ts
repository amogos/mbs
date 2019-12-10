import * as BookTypes from './book_types';
import * as SpaceTypes from './space_types';
import * as BookDescriptionTypes from './book_description_types';
import * as UserTypes from './user_types';

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

export const UserFeedTypeToString = (type: number) => {
    switch (type) {
        case UserFeedType.INVALID:
            return 'Invalid';
        case UserFeedType.LIKES_BOOK:
            return 'likes book';
        case UserFeedType.RATED_BOOK:
            return 'rated book';
        case UserFeedType.RENTED_BOOK:
            return 'rented book';
        case UserFeedType.REQUESTED_BOOK:
            return 'requested book';
        case UserFeedType.ADDED_BOOK:
            return 'requested book';
        case UserFeedType.REMOVED_BOOK:
            return 'requested book';
        case UserFeedType.FOLLOWING_SPACE:
            return 'followin space';
    }
};

export interface UserFeedRecordType {
    id: number;
    type: number;
    user: UserTypes.UserRecordType;
    book?: BookTypes.BookRecordType;
    space?: SpaceTypes.SpaceType;
    bookDescription?: BookDescriptionTypes.BookDescriptionRecordType;
    date: number;
}

export const NullUserFeedRecordType = (): UserFeedRecordType => {
    return { id: 0, type: UserFeedType.INVALID, date: 0, user: UserTypes.NullUserRecordType() };
};

export interface UserFeedRawValueType {
    type: number;
    userId: number;
    book?: number;
    space?: number;
    bookDescriptionId?: number;
    date: number;
}

export const NullUserFeedRawValueType = (): UserFeedRawValueType => {
    return { type: UserFeedType.INVALID, userId: 0, date: 0 };
};

export interface UserFeedRawRecordType {
    id: number;
    type: number;
    userId: number;
    book?: number;
    space?: number;
    bookDescriptionId?: number;
    date: number;
}

export const NullUserFeedRawRecordType = (): UserFeedRawRecordType => {
    return { id: 0, type: UserFeedType.INVALID, userId: 0, date: 0 };
};

export const UserFeedBookEvent = (
    userId: number,
    event: number,
    bookId?: number,
    bookDescriptionId?: number,
): UserFeedRawValueType => {
    const userFeed = NullUserFeedRawValueType();
    userFeed.type = event;
    userFeed.book = bookId;
    userFeed.userId = userId;
    userFeed.bookDescriptionId = bookDescriptionId;
    userFeed.date = Date.now();
    return userFeed;
};

export const UserFeedSpaceEvent = (userId: number, event: number, spaceId: number): UserFeedRawValueType => {
    const userFeed = NullUserFeedRawValueType();
    userFeed.type = event;
    userFeed.space = spaceId;
    userFeed.userId = userId;
    userFeed.date = Date.now();
    return userFeed;
};

export const UserFeedRecordTypeFromRawType = (data: UserFeedRawRecordType): UserFeedRecordType => {
    const result = NullUserFeedRecordType();
    result.id = data.id;
    result.date = data.date;
    result.type = data.type;
    return result;
};
