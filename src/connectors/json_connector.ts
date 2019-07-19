import axios from 'axios';
import * as DataTypes from '../types';
import * as BookStateTypes from '../constants/book_states_constant';

export default class JsonConnector {
    public constructor() {
        this.init();
    }

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

    public async getLanguages(onError: (resultCode: number) => void): Promise<DataTypes.LanguageRecordType[]> {
        let languagesArray: DataTypes.LanguageRecordType[] = [];
        await axios
            .get('http://localhost:3001/languages')
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

    public async getBooks(onError: (resultCode: number) => void): Promise<DataTypes.BookRecordType[]> {
        let booksArray: DataTypes.BookRecordType[] = [];
        await axios
            .get('http://localhost:3001/books')
            .then(response => {
                response.data.forEach(async (item: any) => {
                    this.startedJobs++;
                    let holder: DataTypes.UserRecordType = DataTypes.nullUser();
                    if (item.holder > 0) {
                        await axios.get('http://localhost:3001/users/' + item.holder).then(r => {
                            holder = {
                                value: {
                                    name: r.data.name,
                                    email: r.data.email,
                                } as DataTypes.UserValueType,
                                id: r.data.id,
                            };
                        });
                    }

                    let owner: DataTypes.UserRecordType = DataTypes.nullUser();
                    await axios.get('http://localhost:3001/users/' + item.owner).then(response => {
                        owner = {
                            value: { name: response.data.name, email: response.data.email } as DataTypes.UserValueType,
                            id: response.data.id,
                        };
                    });

                    let language = DataTypes.nullLanguage();
                    await axios.get('http://localhost:3001/languages/' + item.language).then(response => {
                        language = { language: response.data.language, id: response.data.id };
                    });
                    let bookValue: DataTypes.BookValueType = {
                        title: item.title,
                        image: item.image,
                        author: item.author,
                        language: language,
                        owner: owner,
                        holder: holder,
                        state: item.state,
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
        await axios.delete('http://localhost:3001/queues/' + rental.id).catch(error => onError(error));
        await axios
            .put('http://localhost:3001/books/' + rental.value.bookId, {
                state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
                holder: rental.value.user.id,
            })
            .catch(error => onError(error));

        return true;
    }

    public async returnBook(bookId: number, onError: (resultCode: number) => void) {
        await axios
            .put('http://localhost:3001/books/' + bookId, {
                state: BookStateTypes.default.STATE_BOOK_IDLE,
                holder: -1,
            })
            .catch(error => onError(error));
    }

    public async rejectRental(
        rental: DataTypes.RentalNotificationRecordType,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        await axios.delete('http://localhost:3001/queues/' + rental.id).catch(error => onError(error));
        return true;
    }

    public async askBook(
        bookId: number,
        ownerId: number,
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ) {
        axios
            .post('http://localhost:3001/queues/', {
                userId: user.id,
                bookId: bookId,
                ownerId: ownerId,
            })
            .catch(error => onError(error));
    }

    public async deleteBook(bookId: number, onError: (resultCode: number) => void) {
        await axios
            .delete('http://localhost:3001/books/' + bookId)
            .then(() => {
                onError(0);
            })
            .catch(error => onError(error));
    }

    public async getUser(
        user: DataTypes.UserValueType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.UserRecordType> {
        let userData = DataTypes.nullUser();
        await axios
            .get('http://localhost:3001/users?email=' + user.email)
            .then(response => {
                userData = DataTypes.dbUserToObject(response.data[0]);
            })
            .catch(error => onError(error));
        return userData;
    }

    public async addBook(value: DataTypes.BookValueType, onError: (resultCode: number) => void) {
        axios
            .post('http://localhost:3001/books/', {
                author: value.author,
                image: value.image,
                language: value.language.id,
                owner: value.owner.id,
                holder: -1,
                title: value.title,
                state: 'state.book.idle',
            })
            .catch(error => onError(error));
    }

    public async getQueue(userId: number, onError: (resultCode: number) => void): Promise<DataTypes.QueueRecordType[]> {
        let queueArray: DataTypes.QueueRecordType[] = [];

        await axios
            .get('http://localhost:3001/queues?userId=' + userId)
            .then(response =>
                response.data.forEach((item: any) => {
                    queueArray.push({
                        id: item.id,
                        value: {
                            bookId: item.bookId,
                            ownerId: item.ownerId,
                            userId: item.userId,
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
        let rentalNotifications: DataTypes.RentalNotificationRecordType[] = [];
        await axios
            .get('http://localhost:3001/queues?ownerId=' + user.id)
            .then(response => {
                if (response.data.length === 0) return rentalNotifications;

                response.data.forEach(async (item: any) => {
                    this.startedJobs++;
                    let user: DataTypes.UserRecordType = DataTypes.nullUser();
                    await axios
                        .get('http://localhost:3001/users/' + item.userId)
                        .then(response => (user = DataTypes.dbUserToObject(response.data)))
                        .catch(error => onError(error));

                    let title = '';
                    await axios
                        .get('http://localhost:3001/books/' + item.bookId)
                        .then(response => (title = response.data.title))
                        .catch(error => onError(error));

                    let notification: DataTypes.RentalNotificationRecordType = {
                        id: item.id,
                        value: {
                            bookTitle: title,
                            bookId: item.id,
                            user: user,
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
