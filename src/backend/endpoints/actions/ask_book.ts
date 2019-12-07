import axios from 'axios';
import { urlQueues } from '../constants';
import * as DataTypes from '../../../shared/types';
import { addFeed } from './../user_feed';

export async function askBook(
    userId: number,
    notification: DataTypes.QueueNotificationValueType,
    onError: (resultCode: number) => void,
) {
    //  add notification
    await axios.post(urlQueues, notification).catch(error => onError(error));
    //  add feed
    await addFeed(
        DataTypes.UserFeedBookEvent(userId, DataTypes.UserFeedType.REQUESTED_BOOK, notification.bookId),
        onError,
    );
}
