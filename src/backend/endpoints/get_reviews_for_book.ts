import axios from 'axios';
import { urlBookReviews } from './constants';
import * as DataTypes from '../../types';

export async function getReviewsForBook(
    bookId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookReviewRecordType[]> {
    let reviewsArray: DataTypes.BookReviewRecordType[] = [];
    const url = `${urlBookReviews}?bookId=${bookId}`;
    await axios
        .get(url)
        .then(response => {
            response.data.forEach((item: DataTypes.BookReviewRecordType) => reviewsArray.push(item));
        })
        .catch(error => onError(error));

    return reviewsArray;
}
