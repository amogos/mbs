export interface UserRecordType {
    id: number;
    value: UserValueType;
}

export interface UserValueType {
    name: string | undefined;
    email: string;
}

export interface BookValueType {
    title: string;
    author: string;
    language: LanguageType;
    image: string;
    owner: UserRecordType;
    holder: UserRecordType;
    state: string;
}

export interface LanguageType {
    id: number;
    language: string;
}

export interface BookRecordType {
    id: number;
    value: BookValueType;
}

export interface RentalNotificationType {
    user: UserRecordType;
    bookTitle: string;
    bookId: number;
}

export const nullUser: UserRecordType = { value: { name: '', email: '' }, id: 0 };
export const nullLanguage: LanguageType = { id: 0, language: '' };
