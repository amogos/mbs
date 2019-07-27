export interface UserRecordType {
    id: number;
    value: UserValueType;
}

export interface UserValueType {
    name: string | undefined;
    email: string;
    picture: string;
}

export interface CategoryRecordType {
    id: number;
    title: string;
}

export interface BookValueType {
    title: string;
    author: string;
    language: LanguageRecordType;
    image: string;
    owner: UserRecordType;
    holder: UserRecordType;
    state: string;
    category: CategoryRecordType;
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

export const NullUser: UserRecordType = {
    id: 0,
    value: { name: '', email: '', picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' },
};

export const dbUserToObject = (jsonData: any) => {
    let value: UserValueType = {
        name: jsonData.name,
        email: jsonData.email,
        picture: jsonData.picture,
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

export const nullCategory = () => {
    const nullCategory: CategoryRecordType = { id: 0, title: '' };
    return nullCategory;
};
