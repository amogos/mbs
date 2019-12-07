import axios from 'axios';
import { urlBooks } from '../constants';
import * as DataTypes from '../../../shared/types';
import { addFeed } from './../user_feed';

export async function deleteBook(userId: number, bookId: number, onError: (resultCode: number) => void) {
    await axios.delete(urlBooks + '/' + bookId).catch(error => onError(error));
    await addFeed(DataTypes.UserFeedBookEvent(userId, DataTypes.UserFeedType.REMOVED_BOOK, bookId), onError);
}
