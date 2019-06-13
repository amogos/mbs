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
    state: string;
    pending: UserType[];
}

export interface BookKeyType {
    id: string | null;
}

export interface BookRecordType {
    id: string | null;
    value: BookValueType;
}

export const nullUser: UserType = { name: '', email: '' };
