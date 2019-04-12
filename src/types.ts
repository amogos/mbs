
export interface UserType {
    name: string;
    email: string;
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

export interface ConfirmationDialogParams {
    message: string;
    button1: string;
}






