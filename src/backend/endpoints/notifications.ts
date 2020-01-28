import axios from 'axios';
import { urlNotifications } from './constants';
import * as DataTypes from '../../shared/types';
import { addFeed } from './user_feed';

export async function getNotificationsToUserId(
    userId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.AppNotification[]> {
    let results: DataTypes.AppNotification[] = [];
    await axios
        .get(`${urlNotifications}?toUserId=${userId}`)
        .then(response => (results = response.data))
        .catch(error => onError(error));
    return results;
}

export async function getNotificationsFromUserIdOfType(
    userId: number,
    type: DataTypes.NotificationType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.AppNotification[]> {
    let results: DataTypes.AppNotification[] = [];
    await axios
        .get(`${urlNotifications}?fromUserId=${userId}&type=${type}`)
        .then(response => (results = response.data))
        .catch(error => onError(error));
    return results;
}

export async function removeNotification(notificationId: number, onError: (resultCode: number) => void): Promise<void> {
    await axios.delete(urlNotifications + '/' + notificationId).catch(error => onError(error));
}

export async function sendNotification(
    notification: DataTypes.AppNotification,
    onError: (resultCode: number) => void,
): Promise<void> {
    await axios.post(urlNotifications, notification).catch(error => onError(error));
    if (notification.type === DataTypes.NotificationType.REQUEST_BOOK) {
        const requestNotification: DataTypes.RequestBookNotification = notification as DataTypes.RequestBookNotification;
        await addFeed(
            DataTypes.UserFeedBookEvent(
                requestNotification.fromUserId,
                DataTypes.UserFeedType.REQUESTED_BOOK,
                requestNotification.bookId,
            ),
            onError,
        );
    }
}
