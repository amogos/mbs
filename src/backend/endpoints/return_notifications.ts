import axios from 'axios';
import { urlReturns } from './constants';
import * as DataTypes from '../../shared/types';
import * as UsersEndpoint from './user';
import * as BooksEndpoint from './books';

export async function getReturnNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.ReturnNotificationType[]> {
    let returnNotifications: DataTypes.ReturnNotificationType[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseArray: any = null;

    await axios
        .get(`${urlReturns}?ownerId=${user.id}`)
        .then(r => (responseArray = r.data))
        .catch(error => onError(error));

    if (responseArray) {
        for (let i = 0; i < responseArray.length; i++) {
            const item = responseArray[i];
            const user = await UsersEndpoint.getUserRecordTypeFromId(item.userId, onError);
            const book = await BooksEndpoint.getBookRawRecordTypeFromId(item.bookId, onError);
            const notification: DataTypes.ReturnNotificationType = {
                returnId: item.id,
                bookId: item.bookId,
                bookTitle: book.title,
                user: user,
            };
            returnNotifications.push(notification);
        }
    }

    return returnNotifications;
}
