import axios from 'axios';
import * as DataTypes from '../../types';
import { urlBooks, urlSpaces } from './constants';
import WaitEqual from '../utils/wait_equal';
import { getUserRecordTypeFromId } from './get_user';

export async function getSpaceStatistics(
    space: number,
    onError: (resultCode: number) => void,
): Promise<{ size: number; rating: number; format: string[] }> {
    let size = 0;
    let rating = 0;
    await axios
        .get(`${urlBooks}?space=${space}`)
        .then(response => {
            size = response.data.length;
        })
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
    let spaceOwner = await getUserRecordTypeFromId(item.owner, onError);
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

export async function getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    let spacesArray: DataTypes.SpaceType[] = [];
    let waitEqual = new WaitEqual();

    await axios
        .get(urlSpaces)
        .then(response => {
            response.data.forEach(async (item: DataTypes.SpaceRawRecordType) => {
                waitEqual.begin();
                const space = await getSpaceDataFromRawData(item, onError);
                spacesArray.push(space);
                waitEqual.end();
            });
        })
        .catch(error => {
            onError(error);
        });

    await waitEqual.result();
    return spacesArray;
}

export async function getSpaceTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.SpaceType> {
    let space = DataTypes.NullSpace;
    let waitEqual = new WaitEqual();
    await axios.get(`${urlSpaces}?id=${id}`).then(async response => {
        waitEqual.begin();
        space = await getSpaceDataFromRawData(response.data[0], onError);
        waitEqual.end();
    });
    await waitEqual.result();
    return space;
}
