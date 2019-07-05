export interface UserType {
    id: number;
    name: string;
    email: string;
}

export interface BookValueType {
    title: string;
    author: string;
    language: LanguageType;
    image: string;
    owner: UserType;
    holder: UserType;
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
    user: UserType;
    bookTitle: string;
    bookId: number;
}

export const nullUser: UserType = { name: '', email: '', id: 0 };
export const nullLanguage: LanguageType = { id: 0, language: '' };
