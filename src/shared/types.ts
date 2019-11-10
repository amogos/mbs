export interface UserRecordType {
    id: number;
    name: string | undefined;
    email: string;
    picture: string;
    following: number[];
    rating: number;
}

export interface UserValueType {
    name: string | undefined;
    email: string;
    picture: string;
    rating: number;
}

export const NullUser: UserRecordType = {
    id: 0,
    name: '',
    email: '',
    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    following: [],
    rating: 0,
};

export const NullLanguage: LanguageRecordType = { id: 0, title: '' };

export interface CategoryRecordType {
    id: number;
    title: string;
}

export interface BookValueType {
    title: string;
    subtitle: string;
    author: string[];
    language: LanguageRecordType;
    image: string;
    owner: UserRecordType;
    holder: UserRecordType;
    state: string;
    isbn: string;
    isbn10: string;
    isbn13: string;
    category: CategoryRecordType;
    return?: number;
    contentScore?: number;
    numReviews?: number;
    format: number;
    space: number;
    description: string;
    length: number;
}

export interface BookDescriptionValueType {
    title: string;
    subtitle: string;
    language: LanguageRecordType;
    image: string;
    author: string[];
    isbn10: string;
    isbn13: string;
    description: string;
    category: number;
    length: number;
    format: number;
}

export interface BookDescriptionRecordType {
    id: number;
    title: string;
    subtitle: string;
    language: LanguageRecordType;
    image: string;
    author: string[];
    isbn10: string;
    isbn13: string;
    description: string;
    length: number;
    format: number;
    category: number;
}

export const NullBookDescriptionRecordType: BookDescriptionRecordType = {
    id: 0,
    title: '',
    subtitle: '',
    language: NullLanguage,
    image: '',
    author: [],
    isbn10: '',
    isbn13: '',
    description: '',
    length: 0,
    format: 0,
    category: 0,
};

export interface BookRecordType {
    id: number;
    title: string;
    subtitle: string;
    author: string[];
    language: LanguageRecordType;
    image: string;
    owner: UserRecordType;
    holder: UserRecordType;
    state: string;
    category: CategoryRecordType;
    format: string;
    space: SpaceType;
    isbn10: string;
    isbn13: string;
    return?: number;
    contentScore?: number;
    numReviews?: number;
    description: string;
}

export interface BookRawValueType {
    isbn10: string;
    isbn13: string;
    owner: number;
    holder: number;
    state: string;
    space: number;
    return?: number;
}

export interface BookRawRecordType {
    id: number;
    isbn10: string;
    isbn13: string;
    owner: number;
    holder: number;
    state: string;
    space: number;
    return?: number;
}

export const NullRawBookRecordType: BookRawRecordType = {
    id: 0,
    owner: 0,
    holder: 0,
    state: '',
    space: 0,
    isbn10: '',
    isbn13: '',
};

export interface LanguageRecordType {
    id: number;
    title: string;
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

export const NullCategory: CategoryRecordType = { id: 0, title: '' };

export interface SpaceType {
    id: number;
    user: UserRecordType;
    numberOfBooks: number;
    numberOfFollowers: number;
    rating: number; // 1-5 and fractional
    transport: number; // 0 - no transport  1 - optional/not mendatory  2 - transport covered
    title: string;
    description: string;
    format: string[];
    picture: string;
}

export const NullSpace: SpaceType = {
    id: 0,
    user: NullUser,
    numberOfBooks: 0,
    numberOfFollowers: 0,
    rating: 0,
    transport: 0,
    title: '',
    description: '',
    format: [],
    picture: '',
};

export interface SpaceRawRecordType {
    id: number;
    owner: number;
    subscription: number;
    title: string;
    description: string;
    transport: number;
    picture: string;
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

export interface FormatRawType {
    id: number;
    type: string;
}

export const NullFormat: FormatRawType = { id: 0, type: '' };

export interface BannerAttributes {
    showCategoryFiltering: boolean;
    showTabFiltering: boolean;
}

export interface Spaces {
    userSpaces: SpaceType[];
    otherSpaces: SpaceType[];
}

export interface UrlParms {
    id: string;
    query: { category?: number; space?: number };
}

export interface UserReviewRecordType {
    bookId: number;
    userId: number;
    comment: string;
    stateScore: number;
    id: number;
}
