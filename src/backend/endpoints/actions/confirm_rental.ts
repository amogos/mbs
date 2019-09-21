import axios from 'axios';
import * as DataTypes from '../../../types';
import { urlBooks, urlQueues, OneDayMilliseconds } from '../constants';
import AsyncCallsWaiter from '../../utils/async_calls_waiter';
import * as BookStateTypes from '../../../constants/book_states_constant';

export async function confirmRental(
    rental: DataTypes.QueueNotificationRecordType,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    const bookIdUrl = `${urlBooks}/${rental.bookId}`;
    let waiter = new AsyncCallsWaiter();

    await axios
        .get(bookIdUrl)
        .then(async result => {
            waiter.begin();
            const value = {
                ...result.data,
                state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
                holder: rental.user.id,
                return: Date.now() + rental.duration * OneDayMilliseconds,
            };
            await axios
                .put(bookIdUrl, value)
                .then(() => waiter.end())
                .catch(error => {
                    onError(error);
                    return false;
                });
        })
        .catch(error => {
            onError(error);
            return false;
        });

    await waiter.result();

    await axios
        .delete(urlQueues + '/' + rental.id)
        .catch(error => {
            onError(error);
            return false;
        })
        .then(callback);

    return true;
}
