import { LanguageRecordType, NullLanguage } from './language_types';
import { CategoryRecordType, NullCategoryRecordType } from './category_types';
import { UserRecordType, NullUserRecordType } from './user_types';
import { SpaceType, NullSpaceType } from './space_types';
import * as BookStates from './../constants/book_states_constant';

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

export const EmptyBookValueType = () => {
    return {
        title: '',
        subtitle: '',
        author: [],
        language: NullLanguage,
        image:
            'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959',
        owner: NullUserRecordType,
        state: BookStates.default.STATE_BOOK_IDLE,
        isbn: '',
        isbn10: '',
        isbn13: '',
        holder: NullUserRecordType,
        category: NullCategoryRecordType,
        format: 1,
        space: 0,
        description: '',
        length: 0,
    };
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

export const NullBookRecordType: BookRecordType = {
    id: 0,
    title: '',
    subtitle: '',
    author: [],
    language: NullLanguage,
    image: '',
    owner: NullUserRecordType,
    holder: NullUserRecordType,
    state: '',
    category: NullCategoryRecordType,
    format: '',
    space: NullSpaceType,
    isbn10: '',
    isbn13: '',
    return: 0,
    contentScore: 0,
    numReviews: 0,
    description: '',
    length: 0,
};

export interface BookRawValueType {
    isbn10: string;
    isbn13: string;
    owner: number;
    holder: number;
    state: string;
    space: number;
    category: number;
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
    category: number;
    return?: number;
}

export const NullRawBookRecordType: BookRawRecordType = {
    id: 0,
    owner: 0,
    holder: 0,
    state: '',
    space: 0,
    category: 0,
    isbn10: '',
    isbn13: '',
};
