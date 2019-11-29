import axios from 'axios';
import { urlBooks } from '../constants';
import * as BookStateTypes from '../../../shared/constants/book_states_constant';
import * as DataTypes from './../../../shared/types';
import { addReturnNotification } from './../return_notifications';

export async function returnBook(bookId: number, onError: (resultCode: number) => void) {
    const bookUrl = `${urlBooks}/${bookId}`;
    await axios
        .get(bookUrl)
        .then(async result => {
            //  update book record
            const value: DataTypes.BookRawValueType = result.data;
            value.state = BookStateTypes.default.STATE_BOOK_IDLE;
            value.holder = -1;
            await axios.put(bookUrl, value).catch(error => onError(error));
            //  add return notification
            const returnNotification: DataTypes.ReturnNotificationValueType = DataTypes.NullReturnNotificationValueType();
            returnNotification.bookId = result.data.id;
            returnNotification.ownerId = result.data.owner;
            returnNotification.userId = result.data.holder;
            await addReturnNotification(returnNotification, onError);
        })
        .catch(error => onError(error));
}
