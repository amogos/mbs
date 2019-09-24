import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlBooks, urlSpaces } from './constants';
import * as UserEndpoint from './user';

export async function getSpaceStatistics(
    space: number,
    onError: (resultCode: number) => void,
): Promise<{ size: number; rating: number; format: string[] }> {
    let size = 0;
    let rating = 0;
    await axios
        .get(`${urlBooks}?space=${space}`)
        .then(response => size = response.data.length)
        .catch(error => {
            onError(error);
        });
    return { size: size, rating: rating, format: ['hardcover'] };
}

async function getSpaceNumberOfFollowers(space: number, onError: (resultCode: number) => void): Promise<number> {
    return 100;
}

export async function getSpaceDataFromRawData(
    item: DataTypes.SpaceRawRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType> {
    let spaceOwner = await UserEndpoint.getUserRecordTypeFromId(item.owner, onError);
    let spaceStatistics = await getSpaceStatistics(item.id, onError);
    let spaceNumberOfFollowers = await getSpaceNumberOfFollowers(item.id, onError);

    const space: DataTypes.SpaceType = {
        id: item.id,
        user: spaceOwner,
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
    let spacesArray: DataTypes.SpaceType[] = [];
    let responseArray: any = null;

    await axios
        .get(urlSpaces)
        .then(r => responseArray = r.data)
        .catch(error => {
            onError(error);
        });

    if (responseArray) {
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

export async function getUserSpaces(user: DataTypes.UserRecordType, onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    return await _getSpaces(`${urlSpaces}?owner=${user.id}`, onError);

}

export async function getSpaceTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType> {
    let response: any = null;
    await axios.get(`${urlSpaces}?id=${id}`).then(r => response = r.data[0]).catch(error => onError(error));
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
