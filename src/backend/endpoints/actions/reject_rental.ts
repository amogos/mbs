import axios from 'axios';
import * as DataTypes from '../../../shared/types';
import { urlNotifications } from '../constants';

export async function rejectRental(
    rental: DataTypes.AppNotification,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    await axios
        .delete(urlNotifications + '/' + rental.id)
        .then(callback)
        .catch(error => onError(error));
    return true;
}
