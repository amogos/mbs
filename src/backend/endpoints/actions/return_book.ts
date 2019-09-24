import axios from 'axios';
import { urlBooks } from '../constants';
import * as BookStateTypes from '../../../shared/constants/book_states_constant';

export async function returnBook(bookId: number, onError: (resultCode: number) => void) {
    await axios
        .get(urlBooks + '/' + bookId)
        .then(async result => {
            const value = {
                ...result.data,
                state: BookStateTypes.default.STATE_BOOK_IDLE,
                holder: -1,
            };
            await axios.put(`${urlBooks} / ${bookId}`, value).catch(error => {
                onError(error);
            });
        })
        .catch(error => {
            onError(error);
        });
}
