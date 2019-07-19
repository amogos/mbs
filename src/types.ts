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
    language: LanguageRecordType;
    image: string;
    owner: UserRecordType;
    holder: UserRecordType;
    state: string;
}

export interface LanguageRecordType {
    id: number;
    language: string;
}

export interface BookRecordType {
    id: number;
    value: BookValueType;
}

export interface RentalNotificationRecordType {
    id: number;
    value: RentalNotificationValue;
}

export interface RentalNotificationValue {
    user: UserRecordType;
    bookTitle: string;
    bookId: number;
}

export interface QueueValueType {
    bookId: number;
    userId: number;
    ownerId: number;
}

export interface QueueRecordType {
    id: number;
    value: QueueValueType;
}

export const nullUser = () => {
    const nullUser: UserRecordType = { id: 0, value: { name: '', email: '' } };
    return nullUser;
};

export const dbUserToObject = (jsonData: any) => {
    let value: UserValueType = {
        name: jsonData.name,
        email: jsonData.email,
    };
    let user: UserRecordType = {
        id: jsonData.id,
        value: value,
    };
    return user;
};

export const nullLanguage = () => {
    const nullLanguage: LanguageRecordType = { id: 0, language: '' };
    return nullLanguage;
};
