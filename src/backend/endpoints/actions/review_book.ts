import axios from 'axios';
import { urlBookReviews } from '../constants';
import * as DataTypes from './../../../shared/types';

export async function reviewBook(review: DataTypes.BookReviewRawValueType, onError: (resultCode: number) => void) {
    await axios.post(urlBookReviews, review).catch(error => onError(error));
}
