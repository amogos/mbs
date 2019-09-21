import axios from 'axios';
import { urlReturns, urlUsers, urlBooks } from './constants';
import * as DataTypes from '../../types';
import AsyncCallsWaiter from '../utils/async_calls_waiter';
import * as UsersEndpoint from './user'
import * as BooksEndpoint from './books'

export async function getReturnNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.ReturnNotificationType[]> {
    let waiter = new AsyncCallsWaiter();
    let returnNotifications: DataTypes.ReturnNotificationType[] = [];
    await axios
        .get(`${urlReturns}?ownerId=${user.id}`)
        .then(response => {
            response.data.forEach(async (item: DataTypes.ReturnRecordType) => {
                waiter.begin();
                const user = await UsersEndpoint.getUserRecordTypeFromId(item.userId, onError);
                const book = await BooksEndpoint.getBookRawRecordTypeFromId(item.bookId, onError);

                let notification: DataTypes.ReturnNotificationType = {
                    returnId: item.id,
                    bookId: item.bookId,
                    bookTitle: book.title,
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
