import axios from 'axios';
import { urlQueues, OneDayMilliseconds } from './constants';
import * as DataTypes from '../../shared/types';

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

export async function getFutureAvailabilityForBookInMilliseconds(
    book: DataTypes.BookRawRecordType,
    onError: (resultCode: number) => void,
): Promise<number> {
    let returnDateMilliseconds = book.return ? book.return : 0;
    await axios
        .get(`${urlQueues}?bookId=${book.id}`)
        .then(response => {
            if (response.data.length > 0) {
                response.data.forEach(
                    (item: DataTypes.QueueRecordType) => (returnDateMilliseconds += OneDayMilliseconds * item.duration),
                );
            }
        })
        .catch(error => onError(error));
    return returnDateMilliseconds;
}
