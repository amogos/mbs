
export interface UserType {
    name: string;
    email: string;
    picture: string;
}

export interface BookValueType {
    title: string;
    author: string;
    language: string;
    image: string;
    owner: UserType;
    holder: UserType;
}

export interface BookKeyType {
    id: string | null;
}

export interface BookRecordType {
    id: string | null;
    value: BookValueType;
}





