export interface BookReviewRecordType {
    id: number;
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
}

export const NullBookReviewRecordType: BookReviewRecordType = { id: 0, isbn10: '', isbn13: '', comment: '', score: 0 };

export interface BookReviewValueType {
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
}

export const NullBookReviewValueType: BookReviewValueType = { isbn10: '', isbn13: '', comment: '', score: 0 };
