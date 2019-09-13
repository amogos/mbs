import axios from 'axios';
import * as DataTypes from '../../types';
import { urlUsers, urlBooks, urlSpaces } from './constants';
import WaitEqual from '../utils/wait_equal';

export async function getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    let spacesArray: DataTypes.SpaceType[] = [];
    let waitEqual = new WaitEqual();

    await axios
        .get(urlSpaces)
        .then(response => {
            response.data.forEach(async (item: DataTypes.SpaceRawRecordType) => {
                let spaceOwner: DataTypes.UserRecordType = DataTypes.NullUser;
                await axios
                    .get(urlUsers + '?id=' + item.owner)
                    .then(response => (spaceOwner = response.data))
                    .catch(error => {
                        onError(error);
                    });

                let spaceNumberOfBooks = 0;

                const space: DataTypes.SpaceType = {
                    user: spaceOwner,
                    numberOfBooks: spaceNumberOfBooks,
                    numberOfFollowers: 100,
                    rating: 3.5,
                    transport: 0,
                    title: item.title,
                    description: item.description,
                };
            });
        })
        .catch(error => {
            onError(error);
        });

    await axios
        .get(urlUsers)
        .then(response => {
            waitEqual.begin();
            response.data.forEach(async (item: DataTypes.UserRecordType) => {
                await axios
                    .get(urlBooks + '?owner=' + item.id)
                    .then(response => {
                        if (response.data.length > 0) {
                            const space: DataTypes.SpaceType = {
                                user: item,
                                numberOfBooks: response.data.length,
                                numberOfFollowers: 100,
                                rating: 3.5,
                                transport: 0,
                                title: 'Anton-Saefkow-Bibliothek Lichtenberg',
                                description: 'Public library in Berlin, Germany',
                            };
                            spacesArray.push(space);
                        }
                        waitEqual.end();
                    })
                    .catch(error => {
                        onError(error);
                    });
            });
        })
        .catch(error => {
            onError(error);
        });
    await waitEqual.result();
    return spacesArray;
}
