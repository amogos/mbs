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
}

export const NullUserFeedValueType = (): UserFeedValueType => {
    return { type: UserFeedType.INVALID };
};

export interface UserFeedRecordType {
    id: number;
    type: number;
    book?: number;
    space?: number;
}

export const NullUserFeedRecordType = (): UserFeedRecordType => {
    return { id: 0, type: UserFeedType.INVALID };
};
