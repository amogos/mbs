import axios from 'axios';
import { urlBookReviews } from '../constants';
import * as DataTypes from '../../../shared/types';

export async function updateBookReview(
    review: DataTypes.BookReviewRawRecordType,
    onError: (resultCode: number) => void,
) {
    await axios.put(`${urlBookReviews}/${review.id}`, review).catch(error => onError(error));
}
