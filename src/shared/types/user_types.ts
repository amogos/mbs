export interface UserRecordType {
    id: number;
    name: string | undefined;
    email: string;
    picture: string;
    following: number[];
    rating: number;
    socialnetwork: number;
}

export interface UserValueType {
    name: string | undefined;
    email: string;
    picture: string;
    following: number[];
    rating: number;
    socialnetwork: number;
}

export const NullUser: UserRecordType = {
    id: 0,
    name: '',
    email: '',
    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    following: [],
    rating: 0,
    socialnetwork: 0,
};
