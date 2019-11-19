export interface UserReviewRecordType {
    bookId: number;
    userId: number;
    comment: string;
    stateScore: number;
    id: number;
}

export const NullUserReviewRecordType: UserReviewRecordType = {
    bookId: 0,
    userId: 0,
    comment: '',
    stateScore: 0,
    id: 0,
};

export interface UserReviewValueType {
    bookId: number;
    userId: number;
    comment: string;
    stateScore: number;
}

export const NullUserReviewValueType: UserReviewValueType = {
    bookId: 0,
    userId: 0,
    comment: '',
    stateScore: 0,
};
