import axios from 'axios';
import * as DataTypes from '../../types';
import { urlUsers, urlBooks } from './constants';
import WaitEqual from '../utils/wait_equal';

export async function getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
    let spacesArray: DataTypes.SpaceType[] = [];
    let waitEqual = new WaitEqual();

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
                                nbooks: response.data.length,
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
