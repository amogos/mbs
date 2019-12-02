import { LanguageRecordType, NullLanguage } from './language_types';
import { CategoryRecordType } from './category_types';

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
    likes: number;
}

export const NullBookDescriptionValueType = (): BookDescriptionValueType => {
    return {
        title: '',
        subtitle: '',
        language: NullLanguage(),
        image: '',
        author: [],
        isbn10: '',
        isbn13: '',
        description: '',
        length: 0,
        format: 0,
        category: [],
        likes: 0,
    };
};

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
    likes: number;
}

export const NullBookDescriptionRecordType = (): BookDescriptionRecordType => {
    return {
        id: 0,
        title: '',
        subtitle: '',
        language: NullLanguage(),
        image: '',
        author: [],
        isbn10: '',
        isbn13: '',
        description: '',
        length: 0,
        format: 0,
        category: [],
        likes: 0,
    };
};
