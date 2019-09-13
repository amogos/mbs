import axios from 'axios';
import * as DataTypes from '../../types';
import { urlUsers, urlBooks, urlSpaces } from './constants';
import WaitEqual from '../utils/wait_equal';

export async function getSpaceOwner(
    owner: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let spaceOwner: DataTypes.UserRecordType = DataTypes.NullUser;
    await axios
        .get(`${urlUsers}?id=${owner}`)
        .then(response => (spaceOwner = response.data))
        .catch(error => {
            onError(error);
        });
    return spaceOwner;
}

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

export async function getSpaceNumberOfFollowers(space: number, onError: (resultCode: number) => void): Promise<number> {
    return 100;
}

export async function getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    let spacesArray: DataTypes.SpaceType[] = [];
    let waitEqual = new WaitEqual();

    await axios
        .get(urlSpaces)
        .then(response => {
            response.data.forEach(async (item: DataTypes.SpaceRawRecordType) => {
                waitEqual.begin();
                let spaceOwner = await getSpaceOwner(item.owner, onError);
                let spaceStatistics = await getSpaceStatistics(item.id, onError);
                let spaceNumberOfFollowers = await getSpaceNumberOfFollowers(item.id, onError);

                const space: DataTypes.SpaceType = {
                    user: spaceOwner,
                    numberOfBooks: spaceStatistics.size,
                    numberOfFollowers: spaceNumberOfFollowers,
                    rating: spaceStatistics.rating,
                    transport: item.transport,
                    title: item.title,
                    description: item.description,
                    format: spaceStatistics.format,
                };
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
