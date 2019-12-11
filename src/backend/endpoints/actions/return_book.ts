import axios from 'axios';
import { urlBooks } from '../constants';
import * as BookStateTypes from '../../../shared/constants/book_states_constant';
import * as DataTypes from './../../../shared/types';
import { addReturnNotification } from './../return_notifications';
import { getBookRawRecordTypeFromId } from './../books';

export async function returnBook(bookId: number, onError: (resultCode: number) => void) {
    //  get book raw record
    const bookUrl = `${urlBooks}/${bookId}`;
    let bookRawRecord: DataTypes.BookRawRecordType = await getBookRawRecordTypeFromId(bookId, onError);
    //  update record holder
    bookRawRecord = { ...bookRawRecord, state: BookStateTypes.default.STATE_BOOK_IDLE, holder: -1 };
    await axios.put(bookUrl, bookRawRecord).catch(error => onError(error));
    //  add return notification
    let returnNotification: DataTypes.ReturnNotificationValueType = DataTypes.NullReturnNotificationValueType();
    returnNotification = {
        ...returnNotification,
        bookId: bookRawRecord.id,
        ownerId: bookRawRecord.owner,
        userId: bookRawRecord.holder,
    };
    await addReturnNotification(returnNotification, onError);
}
