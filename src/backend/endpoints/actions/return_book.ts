import axios from 'axios';
import { urlBooks } from '../constants';
import * as BookStateTypes from '../../../shared/constants/book_states_constant';
import * as DataTypes from './../../../shared/types';
import { addReturnNotification } from './../return_notifications';
import { getBookRawRecordTypeFromId } from './../books';

export async function returnBook(bookId: number, onError: (resultCode: number) => void) {
    const bookUrl = `${urlBooks}/${bookId}`;

    //  get book raw record
    let value: DataTypes.BookRawRecordType = await getBookRawRecordTypeFromId(bookId, onError);
    value = { ...value, state: BookStateTypes.default.STATE_BOOK_IDLE, holder: -1 };

    //  update record holder
    await axios.put(bookUrl, value).catch(error => onError(error));

    //  add return notification
    let returnNotification: DataTypes.ReturnNotificationValueType = DataTypes.NullReturnNotificationValueType();
    returnNotification = { ...returnNotification, bookId: value.id, ownerId: value.owner, userId: value.holder };
    await addReturnNotification(returnNotification, onError);
}
