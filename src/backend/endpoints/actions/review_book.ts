import axios from 'axios';
import { urlBookReviews } from '../constants';
import * as DataTypes from './../../../shared/types';
import { addFeed } from './../user_feed';

export async function reviewBook(
    userId: number,
    review: DataTypes.BookReviewRawValueType,
    onError: (resultCode: number) => void,
) {
    await axios.post(urlBookReviews, review).catch(error => onError(error));
    await addFeed(DataTypes.UserFeedBookEvent(userId, DataTypes.UserFeedType.RATED_BOOK, review.bookId), onError);
}
