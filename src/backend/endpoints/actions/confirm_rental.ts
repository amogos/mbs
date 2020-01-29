import axios from 'axios';
import * as DataTypes from '../../../shared/types';
import { OneDayMilliseconds } from '../../../shared/constants/time_constant';
import { urlBooks, urlNotifications } from './../constants';
import * as BookStateTypes from '../../../shared/constants/book_states_constant';

export async function confirmRental(
    notification: DataTypes.AppNotification,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    const rental = notification as DataTypes.RequestBookNotification;
    const bookIdUrl = `${urlBooks}/${rental.bookId}`;
    let bookResponse: any = null;
    /**Get book record*/
    await axios
        .get(bookIdUrl)
        .then(response => (bookResponse = response))
        .catch(error => {
            onError(error);
            return false;
        });

    if (!bookResponse) return false;
    /** Update book record holder and return dates*/
    const value = {
        ...bookResponse.data,
        state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
        holder: rental.fromUserId,
        returndate: Date.now() + rental.duration * OneDayMilliseconds,
        requestdate: Date.now(),
    };
    await axios.put(bookIdUrl, value).catch(error => {
        onError(error);
        return false;
    });

    /**Solve/remove notification*/
    await axios
        .delete(urlNotifications + '/' + rental.id)
        .catch(error => {
            onError(error);
            return false;
        })
        .then(callback);

    return true;
}
