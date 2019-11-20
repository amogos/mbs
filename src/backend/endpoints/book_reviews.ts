import axios from 'axios';
import { urlBookReviews } from './constants';
import * as DataTypes from '../../shared/types';
import { getBookRawRecordTypeFromId } from './../endpoints/books';

export async function getReviewsForISBN10(isbn10: string, onError: (resultCode: number) => void) {
    let reviewsArray: DataTypes.BookReviewRecordType[] = [];
    if (isbn10.length === 10) {
        const urlReviews = `${urlBookReviews}?isbn10=${isbn10}`;
        await axios
            .get(urlReviews)
            .then(response => (reviewsArray = response.data))
            .catch(error => onError(error));
    }
    return reviewsArray;
}

export async function getReviewsForISBN13(isbn13: string, onError: (resultCode: number) => void) {
    let reviewsArray: DataTypes.BookReviewRecordType[] = [];
    if (isbn13.length === 13) {
        const urlReviews = `${urlBookReviews}?isbn13=${isbn13}`;
        await axios
            .get(urlReviews)
            .then(response => (reviewsArray = response.data))
            .catch(error => onError(error));
    }
    return reviewsArray;
}

export async function getReviewsForBook(
    bookId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookReviewRecordType[]> {
    const book: DataTypes.BookRawRecordType = await getBookRawRecordTypeFromId(bookId, onError);
    let reviewsArray: DataTypes.BookReviewRecordType[] = [];
    const reviewsArrayISBN10 = await getReviewsForISBN10(book.isbn10, onError);
    const reviewsArrayISBN13 = await getReviewsForISBN13(book.isbn13, onError);
    reviewsArray = reviewsArray.concat(reviewsArrayISBN10, reviewsArrayISBN13);
    return reviewsArray;
}

export async function getReviewStatisticsForBook(
    bookId: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookReviewStatisticsType> {
    const statistics: DataTypes.BookReviewStatisticsType = DataTypes.NullBookReviewStatisticsType;
    const reviewsArray: DataTypes.BookReviewRecordType[] = await getReviewsForBook(bookId, onError);

    if (reviewsArray.length > 0) {
        reviewsArray.forEach((item: DataTypes.BookReviewRecordType) => (statistics.contentScore += item.score));
        statistics.contentScore = statistics.contentScore / reviewsArray.length;
        statistics.numReviews = reviewsArray.length;
    }

    return statistics;
}
