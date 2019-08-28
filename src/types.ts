export interface UserRecordType {
    id: number;
    name: string | undefined;
    email: string;
    picture: string;
}

export interface UserValueType {
    name: string | undefined;
    email: string;
    picture: string;
}

export const NullUser: UserRecordType = {
    id: 0,
    name: '',
    email: '',
    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
};

export interface CategoryRecordType {
    id: number;
    title: string;
}

export interface BookValueType {
    title: string;
    author: string;
    language: LanguageRecordType;
    image: string;
    owner: UserRecordType;
    holder: UserRecordType;
    state: string;
    category: CategoryRecordType;
    return?: number;
    contentScore?: number;
    numReviews?: number;
}

export interface LanguageRecordType {
    id: number;
    language: string;
}

export interface BookRecordType {
    id: number;
    value: BookValueType;
}

export interface RentalNotificationRecordType {
    id: number;
    value: RentalNotificationValue;
}

export interface RentalNotificationValue {
    user: UserRecordType;
    bookTitle: string;
    bookId: number;
    duration: number;
}

export interface ReturnRecordType {
    id: number;
    bookId: number;
    userId: number;
    ownerId: number;
}

export interface ReturnValueType {
    bookId: number;
    userId: number;
    ownerId: number;
}

export interface ReturnNotificationType {
    bookId: number;
    bookTitle: string;
    user: UserRecordType;
}

export interface QueueValueType {
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}

export interface QueueRecordType {
    id: number;
    value: QueueValueType;
}

export const NullLanguage: LanguageRecordType = { id: 0, language: '' };

export const NullCategory: CategoryRecordType = { id: 0, title: '' };

export interface SpaceType {
    user: UserRecordType;
    nbooks: number;
}

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
