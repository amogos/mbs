import axios from 'axios';
import { urlQueues, urlUsers, urlBooks } from './constants';
import * as DataTypes from '../../types';
import WaitEqual from './../utils/wait_equal';

export async function getQueueNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.QueueNotificationRecordType[]> {
    let waiter = new WaitEqual();
    let rentalNotifications: DataTypes.QueueNotificationRecordType[] = [];
    await axios
        .get(urlQueues + '?ownerId=' + user.id)
        .then(response => {
            if (response.data.length === 0) return rentalNotifications;

            response.data.forEach(async (item: any) => {
                waiter.begin();
                let user: DataTypes.UserRecordType = DataTypes.NullUser;
                await axios
                    .get(urlUsers + '/' + item.userId)
                    .then(response => (user = response.data))
                    .catch(error => onError(error));

                let title = '';
                let holder = -1;
                await axios
                    .get(urlBooks + '/' + item.bookId)
                    .then(response => {
                        title = response.data.title;
                        holder = response.data.holder;
                    })
                    .catch(error => onError(error));

                const notAssigned = holder < 0;
                const alreadyOneRequestForBookIdProcessed = rentalNotifications.find(
                    notifiction => notifiction.bookId === item.bookId,
                );
                if (notAssigned && !alreadyOneRequestForBookIdProcessed) {
                    let notification: DataTypes.QueueNotificationRecordType = {
                        id: item.id,
                        bookTitle: title,
                        bookId: item.bookId,
                        user: user,
                        duration: item.duration,
                    };
                    rentalNotifications.push(notification);
                }
                waiter.end();
            });
        })
        .catch(error => onError(error));

    await waiter.result();
    return rentalNotifications;
}
