export interface BookReviewRecordType {
    id: number;
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
}

export interface BookReviewValueType {
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
}

export const NullReviewValueType: BookReviewValueType = { isbn10: '', isbn13: '', comment: '', score: 0 };

export interface UserReviewRecordType {
    bookId: number;
    userId: number;
    comment: string;
    stateScore: number;
    id: number;
}
