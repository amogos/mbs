import axios from 'axios';
import { urlBooks } from '../constants';

export async function deleteBook(bookId: number, onError: (resultCode: number) => void) {
    await axios
        .delete(urlBooks + '/' + bookId)
        .then(() => {
            onError(0);
        })
        .catch(error => onError(error));
}
