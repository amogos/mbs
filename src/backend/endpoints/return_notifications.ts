import axios from 'axios';
import { urlReturns } from './constants';
import * as DataTypes from '../../shared/types';
import * as UsersEndpoint from './user';
import * as BooksDescriptions from './books_descriptions';
import { getBookRawRecordTypeFromId } from './books';

export async function addReturnNotification(
    notification: DataTypes.ReturnNotificationValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.ReturnNotificationRecordType> {
    let result: DataTypes.ReturnNotificationRecordType = DataTypes.NullReturnNotificationRecordType();
    await axios
        .post(urlReturns, notification)
        .then(r => (result = r.data))
        .catch(error => onError(error));

    return result;
}

export async function getReturnNotifications(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.ReturnNotificationType[]> {
    const returnNotifications: DataTypes.ReturnNotificationType[] = [];
    let responseArray: DataTypes.ReturnNotificationRecordType[] = [];

    await axios
        .get(`${urlReturns}?ownerId=${user.id}`)
        .then(r => (responseArray = r.data))
        .catch(error => onError(error));

    if (responseArray) {
        for (let i = 0; i < responseArray.length; i++) {
            const item = responseArray[i];
            const book = await getBookRawRecordTypeFromId(item.bookId, onError);
            const description = await BooksDescriptions.getBookDescriptionForISBN(book.isbn10, book.isbn13, onError);
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
