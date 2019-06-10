export interface UserType {
    name: string;
    email: string;
}

export interface BookStateType {
    state: string;
    accounts: UserType[];
}

export const IdleBookState: BookStateType = {
    state: 'state.book.idle',
    accounts: [],
};

export interface BookValueType {
    title: string;
    author: string;
    language: string;
    image: string;
    owner: UserType;
    state: BookStateType;
}

export interface BookKeyType {
    id: string | null;
}

export interface BookRecordType {
    id: string | null;
    value: BookValueType;
}

export const nullUser: UserType = { name: '', email: '' };
