import axios from 'axios';
import { urlBookReviews } from '../constants';

export async function reviewBook(
    bookId: number,
    userId: number,
    comment: string,
    contentScore: number,
    stateScore: number,
    onError: (resultCode: number) => void,
) {
    await axios
        .post(urlBookReviews, {
            bookId: bookId,
            userId: userId,
            comment: comment,
            contentScore: contentScore,
            stateScore: stateScore,
        })
        .catch(error => onError(error));
}
