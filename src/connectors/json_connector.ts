import axios from 'axios';
import * as DataTypes from '../types';
import * as BookStateTypes from '../constants/book_states_constant';

export default class JsonConnector {
    public constructor() {
        this.init();
    }

    public startedJobs: number = 0;
    public completedJobs: number = 0;

    private urlBooks = 'http://localhost:3001/books';
    private urlLanguages = 'http://localhost:3001/languages';
    private urlUsers = 'http://localhost:3001/users';
    private urlQueues = 'http://localhost:3001/queues';
    private urlCategory = 'http://localhost:3001/categories';

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

    public async getLanguages(onError: (resultCode: number) => void): Promise<DataTypes.LanguageRecordType[]> {
        let languagesArray: DataTypes.LanguageRecordType[] = [];
        await axios
            .get(this.urlLanguages)
            .then(response => {
                response.data.forEach((item: DataTypes.LanguageRecordType) => {
                    languagesArray.push(item);
                });
            })
            .catch(error => {
                onError(error);
            });
        return languagesArray;
    }

    public async getCategories(onError: (resultCode: number) => void): Promise<DataTypes.CategoryRecordType[]> {
        let categoryArray: DataTypes.CategoryRecordType[] = [];
        await axios
            .get(this.urlCategory)
            .then(response => {
                response.data.forEach((item: DataTypes.CategoryRecordType) => {
                    categoryArray.push(item);
                });
            })
            .catch(error => {
                onError(error);
            });
        return categoryArray;
    }

    public async getSpaces(onError: (resultCode: number) => void): Promise<DataTypes.SpaceType[]> {
        let spacesArray: DataTypes.SpaceType[] = [];
        this.startedJobs = this.completedJobs = 0;
        await axios
            .get(this.urlUsers)
            .then(response => {
                this.startedJobs++;
                response.data.forEach(async (item: DataTypes.UserRecordType) => {
                    await axios
                        .get(this.urlBooks + '?owner=' + item.id)
                        .then(response => {
                            if (response.data.length > 0) {
                                const space: DataTypes.SpaceType = {
                                    user: DataTypes.dbUserToObject(item),
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
        let filterdBooksUrl = this.urlBooks;
        this.startedJobs = this.completedJobs = 0;
        if (filters && filters.length > 0) {
            filterdBooksUrl += '?' + filters.join('&');
        }
        await axios
            .get(filterdBooksUrl)
            .then(response => {
                response.data.forEach(async (item: any) => {
                    this.startedJobs++;
                    let holder: DataTypes.UserRecordType = DataTypes.NullUser;
                    if (item.holder > 0) {
                        await axios.get(this.urlUsers + '/' + item.holder).then(r => {
                            holder = {
                                value: {
                                    name: r.data.name,
                                    email: r.data.email,
                                    picture: r.data.picture,
                                } as DataTypes.UserValueType,
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
                    await axios.get(this.urlUsers + '/' + item.owner).then(response => {
                        owner = {
                            value: {
                                name: response.data.name,
                                email: response.data.email,
                                picture: response.data.picture,
                            } as DataTypes.UserValueType,
                            id: response.data.id,
                        };
                    });

                    let language = DataTypes.NullLanguage;
                    await axios.get(this.urlLanguages + '/' + item.language).then(response => {
                        language = { language: response.data.language, id: response.data.id };
                    });

                    let category = DataTypes.NullCategory;
                    await axios.get(this.urlCategory + '/' + item.category).then(response => {
                        category = { id: response.data.id, title: response.data.title };
                    });

                    let bookValue: DataTypes.BookValueType = {
                        title: item.title,
                        image: item.image,
                        author: item.author,
                        language: language,
                        owner: owner,
                        holder: holder,
                        state: item.state,
                        category: category,
                        return: item.return,
                    };

                    booksArray.push({
                        id: item.id,
                        value: bookValue,
                    } as DataTypes.BookRecordType);
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
        rental: DataTypes.RentalNotificationRecordType,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        await axios
            .get(this.urlBooks + '/' + rental.value.bookId)
            .then(async result => {
                const value = {
                    ...result.data,
                    state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
                    holder: rental.value.user.id,
                    return: Date.now() + rental.value.duration * 24 * 60 * 60 * 60 * 1000,
                };
                await axios.put(this.urlBooks + '/' + rental.value.bookId, value).catch(error => {
                    onError(error);
                    return false;
                });
            })
            .catch(error => {
                onError(error);
                return false;
            });

        await axios.delete(this.urlQueues + '/' + rental.id).catch(error => {
            onError(error);
            return false;
        });

        return true;
    }

    public async rejectRental(
        rental: DataTypes.RentalNotificationRecordType,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        await axios.delete(this.urlQueues + '/' + rental.id).catch(error => onError(error));
        return true;
    }

    public async returnBook(bookId: number, onError: (resultCode: number) => void) {
        await axios
            .get(this.urlBooks + '/' + bookId)
            .then(async result => {
                const value = {
                    ...result.data,
                    state: BookStateTypes.default.STATE_BOOK_IDLE,
                    holder: -1,
                };
                await axios.put(this.urlBooks + '/' + bookId, value).catch(error => {
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
            .post(this.urlQueues, {
                userId: user.id,
                bookId: bookId,
                ownerId: ownerId,
                duration: duration,
            })
            .catch(error => onError(error));
    }

    public async deleteBook(bookId: number, onError: (resultCode: number) => void) {
        await axios
            .delete(this.urlBooks + '/' + bookId)
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
            .get(this.urlUsers + '?email=' + user.email)
            .then(async response => {
                const isNewUser = response.data.length === 0;
                if (isNewUser) {
                    await axios
                        .post(this.urlUsers, user)
                        .then(response => {
                            userData = DataTypes.dbUserToObject(response.data[0]);
                        })
                        .catch(error => onError(error));
                } else {
                    userData = DataTypes.dbUserToObject(response.data[0]);

                    const profilePictureAvailable = userData.value.picture !== DataTypes.NullUser.value.picture;
                    const socialMediaPicture = user.picture;

                    if (!profilePictureAvailable) {
                        userData.value.picture = socialMediaPicture;
                    }
                }
            })
            .catch(error => onError(error));

        return userData;
    }

    public async addBook(value: DataTypes.BookValueType, onError: (resultCode: number) => void) {
        await axios
            .post(this.urlBooks, {
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

    public async getQueue(userId: number, onError: (resultCode: number) => void): Promise<DataTypes.QueueRecordType[]> {
        let queueArray: DataTypes.QueueRecordType[] = [];

        await axios
            .get(this.urlQueues + '?userId=' + userId)
            .then(response =>
                response.data.forEach(async (item: any) => {
                    queueArray.push({
                        id: item.id,
                        value: {
                            bookId: item.bookId,
                            ownerId: item.ownerId,
                            userId: item.userId,
                            duration: item.duration,
                        } as DataTypes.QueueValueType,
                    });
                }),
            )
            .catch(error => onError(error));

        return queueArray;
    }

    public async getRentalNotifications(
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.RentalNotificationRecordType[]> {
        this.startedJobs = this.completedJobs = 0;
        let rentalNotifications: DataTypes.RentalNotificationRecordType[] = [];
        await axios
            .get(this.urlQueues + '?ownerId=' + user.id)
            .then(response => {
                if (response.data.length === 0) return rentalNotifications;

                response.data.forEach(async (item: any) => {
                    this.startedJobs++;
                    let user: DataTypes.UserRecordType = DataTypes.NullUser;
                    await axios
                        .get(this.urlUsers + '/' + item.userId)
                        .then(response => (user = DataTypes.dbUserToObject(response.data)))
                        .catch(error => onError(error));

                    let title = '';
                    await axios
                        .get(this.urlBooks + '/' + item.bookId)
                        .then(response => (title = response.data.title))
                        .catch(error => onError(error));

                    let notification: DataTypes.RentalNotificationRecordType = {
                        id: item.id,
                        value: {
                            bookTitle: title,
                            bookId: item.bookId,
                            user: user,
                            duration: item.duration,
                        } as DataTypes.RentalNotificationValue,
                    };
                    rentalNotifications.push(notification);
                    this.completedJobs++;
                });
            })
            .catch(error => onError(error));

        await this.workInProgress();
        return rentalNotifications;
    }
}
