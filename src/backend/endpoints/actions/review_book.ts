import axios from 'axios';
import { urlBookReviews } from '../constants';
import * as DataTypes from './../../../shared/types';
import { addFeed } from './../user_feed';
import { getBookDescriptionForISBN } from './../books_descriptions';

export async function reviewBook(review: DataTypes.BookReviewRawValueType, onError: (resultCode: number) => void) {
    await axios.post(urlBookReviews, review).catch(error => onError(error));
    const description: DataTypes.BookDescriptionRecordType = await getBookDescriptionForISBN(
        review.isbn10,
        review.isbn13,
        onError,
    );
    await addFeed(DataTypes.UserFeedBookEvent(DataTypes.UserFeedType.RATED_BOOK, undefined, description.id), onError);
}
