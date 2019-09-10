import axios from 'axios';
import { urlUserReviews, urlReturns } from './constants';

export async function reviewUser(
    returnId: number,
    bookId: number,
    userId: number,
    comment: string,
    stateScore: number,
    callback: () => void,
    onError: (resultCode: number) => void,
) {
    await axios
        .post(urlUserReviews, {
            bookId: bookId,
            userId: userId,
            comment: comment,
            stateScore: stateScore,
        })
        .then(callback)
        .catch(error => onError(error));

    await axios.delete(urlReturns + '/' + returnId).catch(error => onError(error));
}
