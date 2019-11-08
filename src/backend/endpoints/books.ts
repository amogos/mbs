import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlBooks } from './constants';
import { getUserRecordTypeFromId } from './user';
import { getLanguageRecordTypeFromId } from './languages';
import { getCategoryRecordTypeFromId } from './categories';
import { getFutureAvailabilityForBookInMilliseconds } from './queue';
import { getReviewStatisticsForBook } from './book_reviews';
import { getFormatRecordTypeFromId } from './format';
import { getSpaceTypeFromId } from './spaces';

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
            const item = responseArray[i];
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
                isbn10: item.isbn10,
                isbn13: item.isbn13,
                format: format.type,
                return: returnDateMilliseconds,
                contentScore: reviewStatistics.contentScore,
                numReviews: reviewStatistics.numReviews,
                description: item.description,
            };

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
        .get(urlBooks + '/' + id)
        .then(response => (record = response.data))
        .catch(error => onError(error));
    return record;
}
