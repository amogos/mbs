import axios from 'axios';
import * as DataTypes from '../../../shared/types';
import { urlQueues } from '../constants';

export async function rejectRental(
    rental: DataTypes.QueueNotificationRecordType,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<boolean> {
    await axios
        .delete(urlQueues + '/' + rental.id)
        .then(callback)
        .catch(error => onError(error));
    return true;
}
