import axios from 'axios';
import { urlBookReviews } from './constants';
import * as DataTypes from '../../shared/types';
import { getBookRawRecordTypeFromId } from './../endpoints/books';
import { getUserRecordTypeFromId } from './user';
import { async } from 'q';

export async function getReviewsForISBN10(isbn10: string, onError: (resultCode: number) => void) {
    let reviewsArray: DataTypes.BookReviewRawRecordType[] = [];
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
    let reviewsArray: DataTypes.BookReviewRawRecordType[] = [];
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
    let reviewsArray: DataTypes.BookReviewRawRecordType[] = [];
    const reviewsArrayISBN10 = await getReviewsForISBN10(book.isbn10, onError);
    const reviewsArrayISBN13 = await getReviewsForISBN13(book.isbn13, onError);
    reviewsArray = [...reviewsArrayISBN13];

    reviewsArrayISBN10.forEach(review => {
        if (!reviewsArray.find(element => element.id === review.id)) {
            reviewsArray.push(review);
        }
    });

    const result: DataTypes.BookReviewRecordType[] = [];

    reviewsArray.forEach(async item => {
        const review = DataTypes.NullBookReviewRecordType();
        review.id = item.id;
        review.comment = item.comment;
        review.isbn10 = item.isbn10;
        review.isbn13 = item.isbn13;
        review.score = item.score;
        review.user = await getUserRecordTypeFromId(item.user, onError);
        review.date = item.date;
        result.push(review);
    });

    return result;
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
