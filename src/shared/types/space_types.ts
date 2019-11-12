import { UserRecordType, NullUser } from './user_types';

export interface SpaceType {
    id: number;
    user: UserRecordType;
    numberOfBooks: number;
    numberOfFollowers: number;
    rating: number; // 1-5 and fractional
    transport: number; // 0 - no transport  1 - optional/not mendatory  2 - transport covered
    title: string;
    description: string;
    format: string[];
    picture: string;
}

export const NullSpace: SpaceType = {
    id: 0,
    user: NullUser,
    numberOfBooks: 0,
    numberOfFollowers: 0,
    rating: 0,
    transport: 0,
    title: '',
    description: '',
    format: [],
    picture: '',
};

export interface SpaceRawRecordType {
    id: number;
    owner: number;
    subscription: number;
    title: string;
    description: string;
    transport: number;
    picture: string;
}

export interface Spaces {
    userSpaces: SpaceType[];
    otherSpaces: SpaceType[];
}
