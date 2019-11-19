import axios from 'axios';
import { urlQueues } from './constants';
import * as DataTypes from '../../shared/types';
import { getUserRecordTypeFromId } from './user';
import { getBookRawRecordTypeFromId } from './books';
import { getBookDescriptionForISBN } from './books_descriptions';

export async function getQueueNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.QueueNotificationRecordType[]> {
    const rentalNotifications: DataTypes.QueueNotificationRecordType[] = [];
    let responseArray: DataTypes.QueueRecordType[] = [];

    await axios
        .get(urlQueues + '?ownerId=' + user.id)
        .then(response => {
            if (response.data.length === 0) return rentalNotifications;
            responseArray = response.data;
        })
        .catch(error => onError(error));

    for (let i = 0; i < responseArray.length; i++) {
        const item = responseArray[i];
        const rawBook = await getBookRawRecordTypeFromId(item.bookId, onError);
        const description = await getBookDescriptionForISBN(rawBook.isbn10, rawBook.isbn13, onError);
        const user = await getUserRecordTypeFromId(item.userId, onError);
        const notAssigned = rawBook.holder < 0;
        const alreadyOneRequestForBookIdProcessed = rentalNotifications.find(
            notifiction => notifiction.bookId === item.bookId,
        );
        if (notAssigned && !alreadyOneRequestForBookIdProcessed) {
            const notification: DataTypes.QueueNotificationRecordType = {
                ...item,
                user: user,
                bookTitle: description.title,
            };

            rentalNotifications.push(notification);
        }
    }
    return rentalNotifications;
}
