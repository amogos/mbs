import axios from 'axios';
import { urlBooks } from '../constants';
import * as BookStateTypes from '../../../shared/constants/book_states_constant';
import * as DataTypes from './../../../shared/types';

export async function returnBook(bookId: number, onError: (resultCode: number) => void) {
    const bookUrl = `${urlBooks}/${bookId}`;
    await axios
        .get(bookUrl)
        .then(async result => {
            const value: DataTypes.BookValueType = {
                ...result.data,
                state: BookStateTypes.default.STATE_BOOK_IDLE,
                holder: -1,
            };

            await axios.put(bookUrl, value).catch(error => {
                onError(error);
            });
        })
        .catch(error => {
            onError(error);
        });
}
