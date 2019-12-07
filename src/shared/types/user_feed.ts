import * as BookTypes from './book_types';
import * as SpaceTypes from './space_types';
import * as BookDescription from './book_description_types';
import book from '../../frontend/components/books/books_listing/book';

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

export interface UserFeedRecordType {
    id: number;
    type: number;
    book?: BookTypes.BookRecordType;
    space?: SpaceTypes.SpaceType;
    bookDescription?: BookDescription.BookDescriptionRecordType;
    date: number;
}

export const NullUserFeedRecordType = (): UserFeedRecordType => {
    return { id: 0, type: UserFeedType.INVALID, date: 0 };
};

export interface UserFeedRawValueType {
    type: number;
    book?: number;
    space?: number;
    bookDescriptionId?: number;
    date: number;
}

export const NullUserFeedRawValueType = (): UserFeedRawValueType => {
    return { type: UserFeedType.INVALID, date: 0 };
};

export interface UserFeedRawRecordType {
    id: number;
    type: number;
    book?: number;
    space?: number;
    bookDescriptionId?: number;
    date: number;
}

export const NullUserFeedRawRecordType = (): UserFeedRawRecordType => {
    return { id: 0, type: UserFeedType.INVALID, date: 0 };
};

export const UserFeedBookEvent = (event: number, bookId?: number, bookDescriptionId?: number): UserFeedRawValueType => {
    const userFeed = NullUserFeedRawValueType();
    userFeed.type = event;
    userFeed.book = bookId;
    userFeed.bookDescriptionId = bookDescriptionId;
    userFeed.date = Date.now();
    return userFeed;
};

export const UserFeedSpaceEvent = (spaceId: number, event: number): UserFeedRawValueType => {
    const userFeed = NullUserFeedRawValueType();
    userFeed.type = event;
    userFeed.space = spaceId;
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
