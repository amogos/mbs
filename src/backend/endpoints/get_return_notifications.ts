import axios from 'axios';
import { urlReturns, urlUsers, urlBooks } from './constants';
import * as DataTypes from '../../types';
import WaitEqual from './../utils/wait_equal';

export async function getReturnNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.ReturnNotificationType[]> {
    let waiter = new WaitEqual();
    let returnNotifications: DataTypes.ReturnNotificationType[] = [];
    await axios
        .get(`${urlReturns}?ownerId=${user.id}`)
        .then(response => {
            response.data.forEach(async (item: DataTypes.ReturnRecordType) => {
                waiter.begin();
                let user: DataTypes.UserRecordType = DataTypes.NullUser;
                await axios
                    .get(urlUsers + '/' + item.userId)
                    .then(response => (user = response.data))
                    .catch(error => onError(error));
                let title = '';
                await axios
                    .get(urlBooks + '/' + item.bookId)
                    .then(response => {
                        title = response.data.title;
                    })
                    .catch(error => onError(error));

                let notification: DataTypes.ReturnNotificationType = {
                    returnId: item.id,
                    bookId: item.bookId,
                    bookTitle: title,
                    user: user,
                };
                returnNotifications.push(notification);
                waiter.end();
            });
        })
        .catch(error => onError(error));
    await waiter.result();
    return returnNotifications;
}
