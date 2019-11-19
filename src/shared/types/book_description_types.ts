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
}

export const NullBookDescriptionValueType: BookDescriptionValueType = {
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
