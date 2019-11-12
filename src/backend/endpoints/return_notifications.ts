import axios from 'axios';
import { urlReturns } from './constants';
import * as DataTypes from '../../shared/types';
import * as UsersEndpoint from './user';
import * as BooksDescriptions from './books_descriptions';

export async function getReturnNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.ReturnNotificationType[]> {
    const returnNotifications: DataTypes.ReturnNotificationType[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseArray: any = null;

    await axios
        .get(`${urlReturns}?ownerId=${user.id}`)
        .then(r => (responseArray = r.data))
        .catch(error => onError(error));

    if (responseArray) {
        for (let i = 0; i < responseArray.length; i++) {
            const item = responseArray[i];
            const description = await BooksDescriptions.getBookDescriptionForISBN(item.isbn10, item.isbn13, onError);
            const user = await UsersEndpoint.getUserRecordTypeFromId(item.userId, onError);
            const notification: DataTypes.ReturnNotificationType = {
                returnId: item.id,
                bookId: item.bookId,
                bookTitle: description.title,
                user: user,
            };
            returnNotifications.push(notification);
        }
    }

    return returnNotifications;
}
