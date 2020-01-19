import axios from 'axios';
import { urlQueues } from './constants';
import { OneDayMilliseconds } from './../../shared/constants/time_constant';
import * as DataTypes from '../../shared/types';

export async function getQueue(
    userId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.QueueNotificationRecordType[]> {
    const queueArray: DataTypes.QueueNotificationRecordType[] = [];

    await axios
        .get(urlQueues + '?userId=' + userId)
        .then(response =>
            response.data.forEach(async (item: DataTypes.QueueNotificationRecordType) => {
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
    let returnDateMilliseconds = book.returndate ? book.returndate : 0;
    await axios
        .get(`${urlQueues}?bookId=${book.id}`)
        .then(response => {
            if (response.data.length > 0) {
                response.data.forEach(
                    (item: DataTypes.QueueNotificationRecordType) =>
                        (returnDateMilliseconds += OneDayMilliseconds * item.duration),
                );
            }
        })
        .catch(error => onError(error));
    return returnDateMilliseconds;
}
