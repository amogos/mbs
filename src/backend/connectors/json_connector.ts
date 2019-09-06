import axios from 'axios';
import * as DataTypes from '../../types';
import * as BookStateTypes from '../../constants/book_states_constant';
import {
    urlBooks,
    urlLanguages,
    urlUsers,
    urlCategory,
    urlBookReviews,
    urlUserReviews,
    urlReturns,
    urlQueues,
} from '../endpoints/constants';

import { getLanguages } from '../endpoints/get_languages';
import { getCategories } from '../endpoints/get_categories';

export default class JsonConnector {
    public getLanguages = getLanguages;
    public getCategories = getCategories;

    public constructor() {
        this.init();
    }

    public OneDayMilliseconds = 24 * 60 * 60 * 1000;
    public startedJobs: number = 0;
    public completedJobs: number = 0;

    private init() {}

    private sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    private workInProgress = () => {
        return new Promise(async resolve => {
            while (this.startedJobs !== this.completedJobs) {
                await this.sleep(10);
            }
            this.startedJobs = this.completedJobs = 0;
            resolve(true);
        });
    };

    public async getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
        let spacesArray: DataTypes.SpaceType[] = [];
        this.startedJobs = this.completedJobs = 0;
        await axios
            .get(urlUsers)
            .then(response => {
                this.startedJobs++;
                response.data.forEach(async (item: DataTypes.UserRecordType) => {
                    await axios
                        .get(urlBooks + '?owner=' + item.id)
                        .then(response => {
                            if (response.data.length > 0) {
                                const space: DataTypes.SpaceType = {
                                    user: item,
                                    nbooks: response.data.length,
                                };
                                spacesArray.push(space);
                            }
                            this.completedJobs++;
                        })
                        .catch(error => {
                            onError(error);
                        });
                });
            })
            .catch(error => {
                onError(error);
            });
        await this.workInProgress();
        return spacesArray;
    }

    public async getBooks(
        filters: string[],
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.BookRecordType[]> {
        let booksArray: DataTypes.BookRecordType[] = [];
        let filterdBooksUrl = urlBooks;
        this.startedJobs = this.completedJobs = 0;
        if (filters && filters.length > 0) {
            filterdBooksUrl += '?' + filters.join('&');
        }
        await axios
            .get(filterdBooksUrl)
            .then(response => {
                response.data.forEach(async (item: DataTypes.BookRawRecordType) => {
                    this.startedJobs++;
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
                                await this.sleep(10);
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
                                        (returnDateMilliseconds += this.OneDayMilliseconds * item.duration),
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
                        return: returnDateMilliseconds,
                        contentScore: contentScore,
                        numReviews: numReviews,
                    };

                    booksArray.push(bookRecord);
                    this.completedJobs++;
                });
            })
            .catch(error => {
                onError(error);
            });

        await this.workInProgress();
        return booksArray;
    }

    public async confirmRental(
        rental: DataTypes.QueueNotificationRecordType,
        callback: () => void,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        const bookIdUrl = `${urlBooks}/${rental.bookId}`;
        this.startedJobs = this.completedJobs = 0;
        await axios
            .get(bookIdUrl)
            .then(async result => {
                this.startedJobs++;
                const value = {
                    ...result.data,
                    state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
                    holder: rental.user.id,
                    return: Date.now() + rental.duration * this.OneDayMilliseconds,
                };
                await axios
                    .put(bookIdUrl, value)
                    .then(() => this.completedJobs++)
                    .catch(error => {
                        onError(error);
                        return false;
                    });
            })
            .catch(error => {
                onError(error);
                return false;
            });

        await this.workInProgress();

        await axios
            .delete(urlQueues + '/' + rental.id)
            .catch(error => {
                onError(error);
                return false;
            })
            .then(callback);

        return true;
    }

    public async rejectRental(
        rental: DataTypes.QueueNotificationRecordType,
        callback: () => void,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        await axios
            .delete(urlQueues + '/' + rental.id)
            .then(callback)
            .catch(error => onError(error));
        return true;
    }

    public async returnBook(bookId: number, onError: (resultCode: number) => void) {
        await axios
            .get(urlBooks + '/' + bookId)
            .then(async result => {
                const value = {
                    ...result.data,
                    state: BookStateTypes.default.STATE_BOOK_IDLE,
                    holder: -1,
                };
                await axios.put(`${urlBooks} / ${bookId}`, value).catch(error => {
                    onError(error);
                });
            })
            .catch(error => {
                onError(error);
            });
    }

    public async askBook(
        bookId: number,
        ownerId: number,
        user: DataTypes.UserRecordType,
        duration: number,
        onError: (resultCode: number) => void,
    ) {
        await axios
            .post(urlQueues, {
                userId: user.id,
                bookId: bookId,
                ownerId: ownerId,
                duration: duration,
            })
            .catch(error => onError(error));
    }

    public async deleteBook(bookId: number, onError: (resultCode: number) => void) {
        await axios
            .delete(urlBooks + '/' + bookId)
            .then(() => {
                onError(0);
            })
            .catch(error => onError(error));
    }

    public async getUser(
        user: DataTypes.UserValueType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.UserRecordType> {
        let userData = DataTypes.NullUser;

        await axios
            .get(urlUsers + '?email=' + user.email)
            .then(async response => {
                const isNewUser = response.data.length === 0;
                if (isNewUser) {
                    await axios
                        .post(urlUsers, user)
                        .then(response => {
                            userData = response.data[0];
                        })
                        .catch(error => onError(error));
                } else {
                    userData = response.data[0];

                    const profilePictureAvailable = userData.picture !== DataTypes.NullUser.picture;
                    const socialMediaPicture = user.picture;

                    if (!profilePictureAvailable) {
                        userData.picture = socialMediaPicture;
                    }
                }
            })
            .catch(error => onError(error));

        return userData;
    }

    public async addBook(value: DataTypes.BookValueType, onError: (resultCode: number) => void) {
        await axios
            .post(urlBooks, {
                author: value.author,
                image: value.image,
                language: value.language.id,
                owner: value.owner.id,
                holder: -1,
                title: value.title,
                state: 'state.book.idle',
                category: value.category.id,
            })
            .catch(error => onError(error));
    }

    public async reviewUser(
        returnId: number,
        bookId: number,
        userId: number,
        comment: string,
        stateScore: number,
        callback: () => void,
        onError: (resultCode: number) => void,
    ) {
        await axios
            .post(urlUserReviews, {
                bookId: bookId,
                userId: userId,
                comment: comment,
                stateScore: stateScore,
            })
            .then(callback)
            .catch(error => onError(error));

        await axios.delete(urlReturns + '/' + returnId).catch(error => onError(error));
    }

    public async reviewBook(
        bookId: number,
        userId: number,
        comment: string,
        contentScore: number,
        stateScore: number,
        onError: (resultCode: number) => void,
    ) {
        await axios
            .post(urlBookReviews, {
                bookId: bookId,
                userId: userId,
                comment: comment,
                contentScore: contentScore,
                stateScore: stateScore,
            })
            .catch(error => onError(error));
    }

    public async getReviewsForBook(
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

    public async getQueue(userId: number, onError: (resultCode: number) => void): Promise<DataTypes.QueueRecordType[]> {
        let queueArray: DataTypes.QueueRecordType[] = [];

        await axios
            .get(urlQueues + '?userId=' + userId)
            .then(response =>
                response.data.forEach(async (item: DataTypes.QueueRecordType) => {
                    queueArray.push(item);
                }),
            )
            .catch(error => onError(error));

        return queueArray;
    }

    public async getReturnNotifications(
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.ReturnNotificationType[]> {
        this.startedJobs = this.completedJobs = 0;
        let returnNotifications: DataTypes.ReturnNotificationType[] = [];
        await axios
            .get(`${urlReturns}?ownerId=${user.id}`)
            .then(response => {
                response.data.forEach(async (item: DataTypes.ReturnRecordType) => {
                    this.startedJobs++;
                    let user: DataTypes.UserRecordType = DataTypes.NullUser;
                    await axios
                        .get(urlUsers + '/' + item.userId)
                        .then(response => (user = response.data))
                        .catch(error => onError(error));
                    let title = '';
                    await axios
                        .get(urlBooks + '/' + item.bookId)
                        .then(response => {
                            title = response.data.title;
                        })
                        .catch(error => onError(error));

                    let notification: DataTypes.ReturnNotificationType = {
                        returnId: item.id,
                        bookId: item.bookId,
                        bookTitle: title,
                        user: user,
                    };
                    returnNotifications.push(notification);
                    this.completedJobs++;
                });
            })
            .catch(error => onError(error));
        await this.workInProgress();
        return returnNotifications;
    }

    public async getQueueNotifications(
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.QueueNotificationRecordType[]> {
        this.startedJobs = this.completedJobs = 0;
        let rentalNotifications: DataTypes.QueueNotificationRecordType[] = [];
        await axios
            .get(urlQueues + '?ownerId=' + user.id)
            .then(response => {
                if (response.data.length === 0) return rentalNotifications;

                response.data.forEach(async (item: any) => {
                    this.startedJobs++;
                    let user: DataTypes.UserRecordType = DataTypes.NullUser;
                    await axios
                        .get(urlUsers + '/' + item.userId)
                        .then(response => (user = response.data))
                        .catch(error => onError(error));

                    let title = '';
                    let holder = -1;
                    await axios
                        .get(urlBooks + '/' + item.bookId)
                        .then(response => {
                            title = response.data.title;
                            holder = response.data.holder;
                        })
                        .catch(error => onError(error));

                    const notAssigned = holder < 0;
                    const alreadyOneRequestForBookIdProcessed = rentalNotifications.find(
                        notifiction => notifiction.bookId === item.bookId,
                    );
                    if (notAssigned && !alreadyOneRequestForBookIdProcessed) {
                        let notification: DataTypes.QueueNotificationRecordType = {
                            id: item.id,
                            bookTitle: title,
                            bookId: item.bookId,
                            user: user,
                            duration: item.duration,
                        };
                        rentalNotifications.push(notification);
                    }
                    this.completedJobs++;
                });
            })
            .catch(error => onError(error));

        await this.workInProgress();
        return rentalNotifications;
    }
}
