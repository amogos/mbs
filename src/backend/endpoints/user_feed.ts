import axios from 'axios';
import { urlUserFeed } from './constants';
import * as DataTypes from '../../shared/types';

export async function getFeeds(onError: (resultCode: number) => void): Promise<DataTypes.UserFeedRecordType[]> {
    let feeds: DataTypes.UserFeedRecordType[] = [];
    await axios
        .get(urlUserFeed)
        .then(response => (feeds = response.data))
        .catch(error => onError(error));
    return feeds;
}

export async function addFeed(feed: DataTypes.UserFeedValueType, onError: (resultCode: number) => void): Promise<void> {
    await axios.post(urlUserFeed, feed).catch(error => onError(error));
}
