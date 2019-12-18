export interface UserRecordType {
    id: number;
    name: string | undefined;
    email: string;
    picture: string;
    following: number[];
    bookmarks: number[];
    categories: number[];
    rating: number;
    socialnetwork: number;
    password: string;
}

export const NullUserRecordType = (): UserRecordType => {
    return {
        id: 0,
        name: '',
        email: '',
        picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        following: [],
        bookmarks: [],
        categories: [],
        rating: 0,
        socialnetwork: 0,
        password: '',
    };
};

export interface UserValueType {
    name: string | undefined;
    email: string;
    picture: string;
    following: number[];
    bookmarks: number[];
    categories: number[];
    rating: number;
    socialnetwork: number;
    password: string;
}

export const NullUserValueType = (): UserValueType => {
    return {
        name: '',
        email: '',
        picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        following: [],
        bookmarks: [],
        categories: [],
        rating: 0,
        socialnetwork: 0,
        password: '',
    };
};
