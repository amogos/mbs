import axios from 'axios';
import { urlNotifications } from './constants';
import * as DataTypes from '../../shared/types';

export async function getNotificationsForUserId(
    userId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.Notification[]> {
    let results: DataTypes.Notification[] = [];
    await axios
        .get(`${urlNotifications}?toUserId=${userId}`)
        .then(response => (results = response.data))
        .catch(error => onError(error));
    return results;
}

export async function removeNotification(notificationId: number, onError: (resultCode: number) => void): Promise<void> {
    await axios.delete(urlNotifications + '/' + notificationId).catch(error => onError(error));
}
