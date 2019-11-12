import { LanguageRecordType, NullLanguage } from './language_types';
import { CategoryRecordType } from './category_types';
import { UserRecordType } from './user_types';
import { SpaceType } from './space_types';

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
    category: CategoryRecordType[];
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
    category: CategoryRecordType[];
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
    category: [],
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
    length: number;
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
