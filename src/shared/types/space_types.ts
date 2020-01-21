import { UserRecordType, NullUserRecordType } from './user_types';

export interface SpaceType {
    id: number;
    owner: UserRecordType;
    subscription: number;
    subscribedUsers: number[];
    pendingUsers: number[];
    numberOfBooks: number;
    numberOfFollowers: number;
    rating: number; // 1-5 and fractional
    transport: number; // 0 - no transport  1 - optional/not mendatory  2 - transport covered
    title: string;
    description: string;
    format: string[];
    picture: string;
}

export const NullSpaceType = (): SpaceType => {
    return {
        id: 0,
        owner: NullUserRecordType(),
        subscription: 0,
        subscribedUsers: [],
        pendingUsers: [],
        numberOfBooks: 0,
        numberOfFollowers: 0,
        rating: 0,
        transport: 0,
        title: '',
        description: '',
        format: [],
        picture: '',
    };
};

export interface SpaceRecordType {
    id: number;
    owner: number;
    subscription: number;
    subscribedUsers: number[];
    pendingUsers: number[];
    title: string;
    description: string;
    transport: number;
    picture: string;
}

export const NullSpaceRecordType = (): SpaceRecordType => {
    return {
        id: 0,
        owner: 0,
        subscription: 0,
        subscribedUsers: [],
        pendingUsers: [],
        title: '',
        description: '',
        transport: 0,
        picture: '',
    };
};

export interface Spaces {
    userSpaces: SpaceType[];
    otherSpaces: SpaceType[];
}

export function ConvertToSpaceRecordType(data: SpaceType): SpaceRecordType {
    const result = NullSpaceRecordType();
    result.id = data.id;
    result.owner = data.owner.id;
    result.subscription = data.subscription;
    result.subscribedUsers = data.subscribedUsers;
    result.pendingUsers = data.pendingUsers;
    result.title = data.title;
    result.description = data.description;
    result.transport = data.transport;
    result.picture = data.picture;
    return result;
}
