import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlBooks, urlSpaces } from './constants';
import * as UserEndpoint from './user';
import { SpaceType, UserRecordType, SubscribeNotificationType } from '../../shared/types';

export async function getSpaceStatistics(
    space: number,
    onError: (resultCode: number) => void,
): Promise<{ size: number; rating: number; format: string[] }> {
    let size = 0;
    const rating = 0;
    await axios
        .get(`${urlBooks}?space=${space}`)
        .then(response => (size = response.data.length))
        .catch(error => {
            onError(error);
        });
    return { size: size, rating: rating, format: ['hardcover'] };
}

async function getSpaceNumberOfFollowers(space: number, onError: (resultCode: number) => void): Promise<number> {
    return 100;
}

async function getSpaceNumberOfSubscribers(space: number, onError: (resultCode: number) => void): Promise<number> {
    return 100;
}
async function getSpaceNumberOfPendingSubscribers(
    space: number,
    onError: (resultCode: number) => void,
): Promise<number> {
    return 100;
}

export async function getSpaceDataFromRawData(
    item: DataTypes.SpaceRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType> {
    const spaceOwner = await UserEndpoint.getUserRecordTypeFromId(item.owner, onError);
    const spaceStatistics = await getSpaceStatistics(item.id, onError);
    const spaceNumberOfFollowers = await getSpaceNumberOfFollowers(item.id, onError);

    const space: DataTypes.SpaceType = {
        id: item.id,
        owner: spaceOwner,
        subscription: item.subscription,
        subscribedUsers: item.subscribedUsers,
        pendingUsers: item.pendingUsers,
        numberOfBooks: spaceStatistics.size,
        numberOfFollowers: spaceNumberOfFollowers,
        rating: spaceStatistics.rating,
        transport: item.transport,
        title: item.title,
        description: item.description,
        format: spaceStatistics.format,
        picture: item.picture,
    };

    return space;
}

async function _getSpaces(url: string, onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    const spacesArray: DataTypes.SpaceType[] = [];
    let responseArray: DataTypes.SpaceRecordType[] = [];

    await axios
        .get(url)
        .then(r => (responseArray = r.data))
        .catch(error => {
            onError(error);
        });

    if (responseArray.length > 0) {
        for (let i = 0; i < responseArray.length; i++) {
            const space = await getSpaceDataFromRawData(responseArray[i], onError);
            spacesArray.push(space);
        }
    }
    return spacesArray;
}

export async function getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    return await _getSpaces(urlSpaces, onError);
}

export async function getUserSpaces(
    userId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType[]> {
    return await _getSpaces(`${urlSpaces}?owner=${userId}`, onError);
}

export async function getOtherSpaces(
    userId: number,
    filters: string[],
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType[]> {
    filters.push(`owner_ne=${userId}`);
    return await _getSpaces(`${urlSpaces}?` + filters.join('&'), onError);
}

export async function getSplitSpaces(
    user: DataTypes.UserRecordType,
    filters: string[],
    onError: (resultCode: number) => void,
): Promise<{ userSpaces: DataTypes.SpaceType[]; otherSpaces: DataTypes.SpaceType[] }> {
    const userSpaces = await getUserSpaces(user.id, onError);
    const otherSpaces = await getOtherSpaces(user.id, filters, onError);
    return { userSpaces: userSpaces, otherSpaces: otherSpaces };
}

export async function getSpaceTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType> {
    let response: any = null;
    await axios
        .get(`${urlSpaces}?id=${id}`)
        .then(r => (response = r.data[0]))
        .catch(error => onError(error));
    const space = await getSpaceDataFromRawData(response, onError);
    return space;
}

export async function addDefaultSpaceForUser(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    const newDefaultSpace = {
        owner: user.id,
        subscription: 0,
        title: user.email,
        description: `${user.name} Default`,
        transport: 0,
        picture: '',
    };

    await axios
        .post(urlSpaces, newDefaultSpace)
        .then(() => {
            return true;
        })
        .catch(error => onError(error));
    return false;
}

export async function getSpace(spaceId: number, onError: (resultCode: number) => void): Promise<DataTypes.SpaceType> {
    let rawSpace: DataTypes.SpaceRecordType = DataTypes.NullSpaceRecordType();
    await axios
        .get(`${urlSpaces}/${spaceId}`)
        .then(response => (rawSpace = response.data))
        .catch(error => {
            onError(error);
        });
    const resolvedSpace: DataTypes.SpaceType = await getSpaceDataFromRawData(rawSpace, onError);
    return resolvedSpace;
}

export async function getSpaceSubscribedUsers(
    spaceId: number,
    onError: (resultCode: number) => void,
): Promise<number[]> {
    const space = await getSpace(spaceId, onError);
    return space.subscribedUsers;
}

export async function getSpacePendingUsers(spaceId: number, onError: (resultCode: number) => void): Promise<number[]> {
    const space = await getSpace(spaceId, onError);
    return space.pendingUsers;
}

export async function updateSpace(
    space: SpaceType,
    onError: (resultCode: number) => void,
    onSuccess?: () => void,
    onFail?: () => void,
): Promise<void> {
    const url = `${urlSpaces}/${space.id}`;
    const spaceRecord = DataTypes.ConvertToSpaceRecordType(space);
    await axios
        .put(url, spaceRecord)
        .then(() => {
            if (onSuccess) onSuccess();
        })
        .catch(error => {
            onError(error);
            if (onFail) onFail();
        });
}

export async function getPendingSubscribersForUserSpaces(
    userId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SubscribeNotificationType[]> {
    const userSpaces = await getUserSpaces(userId, onError);
    const result: SubscribeNotificationType[] = [];

    for (let i = 0; i < userSpaces.length; i++) {
        const space = userSpaces[i];
        const spacePendingUsers = space.pendingUsers;

        for (let j = 0; j < spacePendingUsers.length; j++) {
            const userData = await UserEndpoint.getUserRecordTypeFromId(spacePendingUsers[j], onError);
            const notification: SubscribeNotificationType = {
                user: userData,
                space: space,
            };
            result.push(notification);
        }
    }

    return result;
}
