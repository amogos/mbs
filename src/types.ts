
export interface UserType {
    id: string;
    accessToken: string;
    name?: string;
    email?: string;
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





