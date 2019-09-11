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

export interface BookRecordType {
    id: number;
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

export interface BookRawRecordType {
    id: number;
    title: string;
    author: string;
    language: number;
    image: string;
    owner: number;
    holder: number;
    state: string;
    category: number;
    space: number;
    return?: number;
}

export interface LanguageRecordType {
    id: number;
    language: string;
}

export interface QueueNotificationRecordType {
    id: number;
    user: UserRecordType;
    bookTitle: string;
    bookId: number;
    duration: number;
}

export interface QueueNotificationType {
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
    returnId: number;
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
    bookId: number;
    userId: number;
    ownerId: number;
    duration: number;
}

export const NullLanguage: LanguageRecordType = { id: 0, language: '' };

export const NullCategory: CategoryRecordType = { id: 0, title: '' };

export interface SpaceType {
    user: UserRecordType;
    numberOfBooks: number;
    numberOfFollowers: number;
    rating: number; // 1-5 and fractional
    format: number; //  1 - hardcover 2 - ebook  4- audio (5 = hardcover & audio)
    transport: number; // 0 - no transport  1 - optional/not mendatory  2 - transport covered
    title: string;
    description: string;
}

export interface SpaceRawRecordType {
    id: number;
    owner: number;
    subscription: number;
    title: string;
    description: string;
    transport: number;
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
