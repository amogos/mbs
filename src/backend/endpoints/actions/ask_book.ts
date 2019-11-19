import axios from 'axios';
import { urlQueues } from '../constants';
import * as DataTypes from '../../../shared/types';

export async function askBook(
    notification: DataTypes.QueueNotificationValueType,
    onError: (resultCode: number) => void,
) {
    await axios.post(urlQueues, notification).catch(error => onError(error));
}
