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


