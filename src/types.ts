import { User } from 'firebase';

export interface UserType {
    name: string;
    email: string;
}

export const IdleBookState = 'state.book.idle';

export interface BookValueType {
    title: string;
    author: string;
    language: string;
    image: string;
    owner: UserType;
    holder: UserType;
    state: string;
}

export interface BookKeyType {
    id: string | null;
}

export interface BookRecordType {
    id: number;
    value: BookValueType;
}

export interface BookPendingNotification {
    user: UserType;
    bookTitle: string;
    bookKey: string;
}

export const nullUser: UserType = { name: '', email: '' };
