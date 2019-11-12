export interface BookReviewRecordType {
    id: number;
    bookId: number;
    comment: string;
    contentScore: number;
    stateScore: number;
}

export interface BookReviewValueType {
    bookId: number;
    comment: string;
    contentScore: number;
    stateScore: number;
}

export interface UserReviewRecordType {
    bookId: number;
    userId: number;
    comment: string;
    stateScore: number;
    id: number;
}
