import { SocialNetwork } from '../constants/social_networks_constants';

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
        socialnetwork: SocialNetwork.custom,
        password: '',
    };
};

export interface UserRecordType extends UserValueType {
    id: number;
}

export const NullUserRecordType = (): UserRecordType => {
    return {
        ...NullUserValueType(),
        id: 0,
    };
};
