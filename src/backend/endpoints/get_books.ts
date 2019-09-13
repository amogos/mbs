import axios from 'axios';
import * as DataTypes from '../../types';
import {
    urlUsers,
    urlBooks,
    urlLanguages,
    urlCategory,
    urlQueues,
    urlBookReviews,
    OneDayMilliseconds,
} from './constants';

import WaitEqual from '../utils/wait_equal';
import Sleep from '../utils/sleep';

export async function getBooks(
    filters: string[],
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRecordType[]> {
    let booksArray: DataTypes.BookRecordType[] = [];
    let filterdBooksUrl = urlBooks;
    let waitEqual = new WaitEqual();

    if (filters && filters.length > 0) {
        filterdBooksUrl += '?' + filters.join('&');
    }
    await axios
        .get(filterdBooksUrl)
        .then(response => {
            response.data.forEach(async (item: DataTypes.BookRawRecordType) => {
                waitEqual.begin();
                let holder: DataTypes.UserRecordType = DataTypes.NullUser;
                if (item.holder > 0) {
                    await axios.get(urlUsers + '/' + item.holder).then(r => {
                        holder = {
                            name: r.data.name,
                            email: r.data.email,
                            picture: r.data.picture,
                            id: r.data.id,
                        };
                    });
                    await new Promise(async resolve => {
                        while (holder.id <= 0) {
                            await Sleep(10);
                        }
                        resolve(true);
                    });
                }

                let owner: DataTypes.UserRecordType = DataTypes.NullUser;
                await axios
                    .get(urlUsers + '/' + item.owner)
                    .then(response => {
                        owner = {
                            name: response.data.name,
                            email: response.data.email,
                            picture: response.data.picture,
                            id: response.data.id,
                        };
                    })
                    .catch(error => onError(error));

                let language = DataTypes.NullLanguage;
                await axios
                    .get(urlLanguages + '/' + item.language)
                    .then(response => {
                        language = { language: response.data.language, id: response.data.id };
                    })
                    .catch(error => onError(error));

                let category = DataTypes.NullCategory;
                await axios
                    .get(urlCategory + '/' + item.category)
                    .then(response => {
                        category = { id: response.data.id, title: response.data.title };
                    })
                    .catch(error => onError(error));

                let returnDateMilliseconds = item.return ? item.return : 0;
                await axios
                    .get(urlQueues + '?bookId=' + item.id)
                    .then(response => {
                        if (response.data.length > 0) {
                            response.data.forEach(
                                (item: DataTypes.QueueRecordType) =>
                                    (returnDateMilliseconds += OneDayMilliseconds * item.duration),
                            );
                        }
                    })
                    .catch(error => onError(error));

                let contentScore = 0;
                let numReviews = 0;

                await axios
                    .get(urlBookReviews + '?bookId=' + item.id)
                    .then(response => {
                        if (response.data.length > 0) {
                            response.data.forEach(
                                (item: DataTypes.BookReviewRecordType) => (contentScore += item.contentScore),
                            );
                            contentScore = contentScore / response.data.length;
                            numReviews = response.data.length;
                        }
                    })
                    .catch(error => onError(error));

                let space: DataTypes.SpaceType = DataTypes.NullSpace;
                let format: DataTypes.FormatRawType = DataTypes.NullFormat;

                let bookRecord: DataTypes.BookRecordType = {
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
                    contentScore: contentScore,
                    numReviews: numReviews,
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
