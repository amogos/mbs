import axios from 'axios';
import * as DataTypes from '../../types';
import { urlBooks, urlQueues, OneDayMilliseconds } from './constants';
import WaitEqual from '../utils/wait_equal';
import * as BookStateTypes from '../../constants/book_states_constant';

export async function confirmRental(
    rental: DataTypes.QueueNotificationRecordType,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    const bookIdUrl = `${urlBooks}/${rental.bookId}`;
    let waitEqual = new WaitEqual();

    await axios
        .get(bookIdUrl)
        .then(async result => {
            waitEqual.begin();
            const value = {
                ...result.data,
                state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
                holder: rental.user.id,
                return: Date.now() + rental.duration * OneDayMilliseconds,
            };
            await axios
                .put(bookIdUrl, value)
                .then(() => waitEqual.end())
                .catch(error => {
                    onError(error);
                    return false;
                });
        })
        .catch(error => {
            onError(error);
            return false;
        });

    await waitEqual.result();

    await axios
        .delete(urlQueues + '/' + rental.id)
        .catch(error => {
            onError(error);
            return false;
        })
        .then(callback);

    return true;
}
