import axios from 'axios';
import { urlBookReviews } from '../constants';
import * as DataTypes from './../../../shared/types';
import { addFeed } from './../user_feed';

export async function reviewBook(review: DataTypes.BookReviewRawValueType, onError: (resultCode: number) => void) {
    await axios.post(urlBookReviews, review).catch(error => onError(error));
    await addFeed(
        DataTypes.UserFeedISBNEvent(review.isbn10, review.isbn13, DataTypes.UserFeedType.RATED_BOOK),
        onError,
    );
}
