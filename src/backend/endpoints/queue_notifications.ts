import axios from 'axios';
import { urlQueues } from './constants';
import * as DataTypes from '../../shared/types';
import { getUserRecordTypeFromId } from './user';
import { getBookRawRecordTypeFromId } from './books';

export async function getQueueNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.QueueNotificationRecordType[]> {
    let rentalNotifications: DataTypes.QueueNotificationRecordType[] = [];
    let responseArray: any = null;

    await axios
        .get(urlQueues + '?ownerId=' + user.id)
        .then(response => {
            if (response.data.length === 0) return rentalNotifications;
            responseArray = response.data;
        })
        .catch(error => onError(error));

    for (let i = 0; i < responseArray.length; i++) {
        const item = responseArray[i];
        const user = await getUserRecordTypeFromId(item.userId, onError);
        const rawBook = await getBookRawRecordTypeFromId(item.bookId, onError);
        const notAssigned = rawBook.holder < 0;
        const alreadyOneRequestForBookIdProcessed = rentalNotifications.find(
            notifiction => notifiction.bookId === item.bookId,
        );
        if (notAssigned && !alreadyOneRequestForBookIdProcessed) {
            let notification: DataTypes.QueueNotificationRecordType = {
                id: item.id,
                bookTitle: rawBook.title,
                bookId: item.bookId,
                user: user,
                duration: item.duration,
            };
            rentalNotifications.push(notification);
        }
    }
    return rentalNotifications;
}
