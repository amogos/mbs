import axios from 'axios';
import * as DataTypes from '../../types';
import { urlBooks } from './constants';

import { getUserRecordTypeFromId } from './user';
import { getLanguageRecordTypeFromId } from './languages';
import { getCategoryRecordTypeFromId } from './categories';
import { getFutureAvailabilityForBookInMilliseconds } from './queue';
import { getReviewStatisticsForBook } from './book_reviews';
import { getFormatRecordTypeFromId } from './format';
import { getSpaceTypeFromId } from './spaces';

import AsyncCallsWaiter from '../utils/async_calls_waiter';

export async function getBooks(
    filters: string[],
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRecordType[]> {
    let booksArray: DataTypes.BookRecordType[] = [];
    let filterdBooksUrl = urlBooks;
    let waiter = new AsyncCallsWaiter();
    const applyFilters = filters && filters.length > 0;

    if (applyFilters) {
        filterdBooksUrl += '?' + filters.join('&');
    }
    await axios
        .get(filterdBooksUrl)
        .then(response => {
            response.data.forEach(async (item: DataTypes.BookRawRecordType) => {
                waiter.begin();
                const holder = await getUserRecordTypeFromId(item.holder, onError);
                const owner = await getUserRecordTypeFromId(item.owner, onError);
                const language = await getLanguageRecordTypeFromId(item.language, onError);
                const category = await getCategoryRecordTypeFromId(item.category, onError);
                const returnDateMilliseconds = await getFutureAvailabilityForBookInMilliseconds(item, onError);
                const reviewStatistics = await getReviewStatisticsForBook(item.id, onError);
                const space = await getSpaceTypeFromId(item.space, onError);
                const format = await getFormatRecordTypeFromId(item.format, onError);
                const bookRecord: DataTypes.BookRecordType = {
                    id: item.id,
                    title: item.title,
                    image: item.image,
                    author: item.author,
                    language: language,
                    owner: owner,
                    holder: holder,
                    state: item.state,
                    category: category,
                    space: space,
                    format: format.type,
                    return: returnDateMilliseconds,
                    contentScore: reviewStatistics.contentScore,
                    numReviews: reviewStatistics.numReviews,
                };

                booksArray.push(bookRecord);
                waiter.end();
            });
        })
        .catch(error => {
            onError(error);
        });

    await waiter.result();
    return booksArray;
}

export async function getBookRawRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRawRecordType> {
    let record: DataTypes.BookRawRecordType = DataTypes.NullRawBookRecordType;
    await axios
        .get(urlBooks + '/' + id)
        .then(response => (record = response.data))
        .catch(error => onError(error));
    return record;
}
