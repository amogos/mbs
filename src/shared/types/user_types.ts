export interface UserRecordType {
    id: number;
    name: string | undefined;
    email: string;
    picture: string;
    following: number[];
    rating: number;
    socialnetwork: number;
    password: string;
}

export const NullUserRecordType: UserRecordType = {
    id: 0,
    name: '',
    email: '',
    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    following: [],
    rating: 0,
    socialnetwork: 0,
    password: '',
};

export interface UserValueType {
    name: string | undefined;
    email: string;
    picture: string;
    following: number[];
    rating: number;
    socialnetwork: number;
    password: string;
}

export const NullUserValueType: UserValueType = {
    name: '',
    email: '',
    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    following: [],
    rating: 0,
    socialnetwork: 0,
    password: '',
};
