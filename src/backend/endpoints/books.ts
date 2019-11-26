import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlBooks } from './constants';
import { getUserRecordTypeFromId } from './user';
import { getLanguageRecordTypeFromId } from './languages';
import { getCategoryRecordTypeFromId } from './categories';
import { getFutureAvailabilityForBookInMilliseconds } from './queue';
import { getReviewStatisticsForBook } from './book_reviews';
import { getBookDescriptionForISBN } from './books_descriptions';
import { getFormatRecordTypeFromId } from './format';
import { getSpaceTypeFromId } from './spaces';
import { BookRecordType } from '../../shared/types';

export async function getBookRecordTypeFromRaw(
    item: DataTypes.BookRawRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRecordType> {
    const result: BookRecordType = DataTypes.NullBookRecordType();
    const description = await getBookDescriptionForISBN(item.isbn10, item.isbn13, onError);
    const holder = await getUserRecordTypeFromId(item.holder, onError);
    const owner = await getUserRecordTypeFromId(item.owner, onError);
    const language = await getLanguageRecordTypeFromId(description.language.id, onError);
    const category = await getCategoryRecordTypeFromId(description.category[0].id, onError);
    const returnDateMilliseconds = await getFutureAvailabilityForBookInMilliseconds(item, onError);
    const reviewStatistics = await getReviewStatisticsForBook(item.id, onError);
    const space = await getSpaceTypeFromId(item.space, onError);
    const format = await getFormatRecordTypeFromId(description.format, onError);

    result.id = item.id;
    result.title = description.title;
    result.subtitle = description.subtitle;
    result.image = description.image;
    result.author = description.author;
    result.language = language;
    result.owner = owner;
    result.holder = holder;
    result.state = item.state;
    result.category = category;
    result.space = space;
    result.isbn10 = item.isbn10;
    result.isbn13 = item.isbn13;
    result.format = format.type;
    result.return = returnDateMilliseconds;
    result.contentScore = reviewStatistics.contentScore;
    result.numReviews = reviewStatistics.numReviews;
    result.description = description.description;
    result.length = description.length;
    return result;
}

export async function getBooks(
    filters: string[],
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRecordType[]> {
    const booksArray: DataTypes.BookRecordType[] = [];
    let filterdBooksUrl = urlBooks;
    const applyFilters = filters && filters.length > 0;

    if (applyFilters) {
        filterdBooksUrl += '?' + filters.join('&');
    }

    let responseArray: DataTypes.BookRawRecordType[] = [];
    await axios
        .get(filterdBooksUrl)
        .then(r => (responseArray = r.data))
        .catch(error => {
            onError(error);
        });

    if (responseArray.length > 0) {
        for (let i = 0; i < responseArray.length; i++) {
            const bookRecord = await getBookRecordTypeFromRaw(responseArray[i], onError);
            booksArray.push(bookRecord);
        }
    }

    return booksArray;
}

export async function getBookRawRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRawRecordType> {
    let record: DataTypes.BookRawRecordType = DataTypes.NullRawBookRecordType;
    await axios
        .get(`${urlBooks}/${id}`)
        .then(response => (record = response.data))
        .catch(error => onError(error));
    return record;
}

export async function getBookRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRecordType> {
    const item: DataTypes.BookRawRecordType = await getBookRawRecordTypeFromId(id, onError);
    return await getBookRecordTypeFromRaw(item, onError);
}
