import axios from 'axios';
import { urlBookReviews } from './constants';
import * as DataTypes from '../../shared/types';

export async function getReviewsForBook(
    bookId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookReviewRecordType[]> {
    const reviewsArray: DataTypes.BookReviewRecordType[] = [];
    const url = `${urlBookReviews}?bookId=${bookId}`;
    await axios
        .get(url)
        .then(response => {
            response.data.forEach((item: DataTypes.BookReviewRecordType) => reviewsArray.push(item));
        })
        .catch(error => onError(error));

    return reviewsArray;
}

export async function getReviewStatisticsForBook(
    bookId: number,
    onError: (resultCode: number) => void,
): Promise<{ contentScore: number; numReviews: number }> {
    let contentScore = 0;
    let numReviews = 0;

    await axios
        .get(`${urlBookReviews}?bookId=${bookId}`)
        .then(response => {
            if (response.data.length > 0) {
                response.data.forEach((item: DataTypes.BookReviewRecordType) => (contentScore += item.contentScore));
                contentScore = contentScore / response.data.length;
                numReviews = response.data.length;
            }
        })
        .catch(error => onError(error));
    return { contentScore: contentScore, numReviews: numReviews };
}
