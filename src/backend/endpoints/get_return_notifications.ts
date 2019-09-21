import axios from 'axios';
import { urlReturns, urlUsers, urlBooks } from './constants';
import * as DataTypes from '../../types';
import WaitEqual from './../utils/wait_equal';
import * as UsersEndpoint from './get_user'
import * as BooksEndpoint from './get_books'

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
                const user = await UsersEndpoint.getUserRecordTypeFromId(item.userId, onError);
                const book = await BooksEndpoint.getBookRawRecordTypeFromId(item.bookId, onError);
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
