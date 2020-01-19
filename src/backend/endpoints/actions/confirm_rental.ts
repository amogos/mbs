import axios from 'axios';
import * as DataTypes from '../../../shared/types';
import { OneDayMilliseconds } from '../../../shared/constants/time_constant';
import { urlBooks, urlQueues } from './../constants';
import * as BookStateTypes from '../../../shared/constants/book_states_constant';

export async function confirmRental(
    rental: DataTypes.QueueNotificationRecordType,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    const bookIdUrl = `${urlBooks}/${rental.bookId}`;
    let bookResponse: any = null;

    await axios
        .get(bookIdUrl)
        .then(response => (bookResponse = response))
        .catch(error => {
            onError(error);
            return false;
        });

    if (!bookResponse) return false;

    const value = {
        ...bookResponse.data,
        state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
        holder: rental.userId,
        returndate: Date.now() + rental.duration * OneDayMilliseconds,
        requestdate: Date.now(),
    };
    await axios.put(bookIdUrl, value).catch(error => {
        onError(error);
        return false;
    });

    await axios
        .delete(urlQueues + '/' + rental.id)
        .catch(error => {
            onError(error);
            return false;
        })
        .then(callback);

    return true;
}
