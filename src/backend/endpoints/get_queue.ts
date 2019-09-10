import axios from 'axios';
import { urlQueues } from './constants';
import * as DataTypes from '../../types';

export async function getQueue(
    userId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.QueueRecordType[]> {
    let queueArray: DataTypes.QueueRecordType[] = [];

    await axios
        .get(urlQueues + '?userId=' + userId)
        .then(response =>
            response.data.forEach(async (item: DataTypes.QueueRecordType) => {
                queueArray.push(item);
            }),
        )
        .catch(error => onError(error));

    return queueArray;
}
