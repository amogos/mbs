import axios from 'axios';
import * as DataTypes from '../../types';
import { urlBooks } from './constants';

import { getUserRecordTypeFromId } from './get_user';
import { getLanguageRecordTypeFromId } from './get_languages';
import { getCategoryRecordTypeFromId } from './get_categories';
import { getFutureAvailabilityForBookInMilliseconds } from './get_queue';
import { getReviewStatisticsForBook } from './get_reviews_for_book';
import { getFormatRecordTypeFromId } from './get_format';
import { getSpaceTypeFromId } from './get_spaces';

import WaitEqual from '../utils/wait_equal';

export async function getBooks(
    filters: string[],
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRecordType[]> {
    let booksArray: DataTypes.BookRecordType[] = [];
    let filterdBooksUrl = urlBooks;
    let waitEqual = new WaitEqual();
    const applyFilters = filters && filters.length > 0;

    if (applyFilters) {
        filterdBooksUrl += '?' + filters.join('&');
    }
    await axios
        .get(filterdBooksUrl)
        .then(response => {
            response.data.forEach(async (item: DataTypes.BookRawRecordType) => {
                waitEqual.begin();
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
                waitEqual.end();
            });
        })
        .catch(error => {
            onError(error);
        });

    await waitEqual.result();
    return booksArray;
}
