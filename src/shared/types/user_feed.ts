export const UserFeedType = {
    INVALID: 0,
    LIKES: 1,
    RATED: 2,
    RENTED: 3,
    REQUESTED: 4,
    ADDED: 5,
    FOLLOWING_SPACE: 6,
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
