import axios from 'axios';
import * as DataTypes from '../types';
import * as BookStateTypes from '../book_states';

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

    public async getBooks(onError: (resultCode: number) => void): Promise<DataTypes.BookRecordType[]> {
        var booksArray: DataTypes.BookRecordType[] = [];
        await axios
            .get('http://localhost:3001/books')
            .then(response => {
                response.data.forEach(async (item: any) => {
                    this.startedJobs++;
                    let holder: DataTypes.UserRecordType = DataTypes.nullUser;
                    if (item.holder > 0) {
                        await axios.get('http://localhost:3001/users/' + item.holder).then(response => {
                            holder = {
                                value: {
                                    name: response.data.name,
                                    email: response.data.email,
                                } as DataTypes.UserValueType,
                                id: response.data.id,
                            };
                        });
                    }

                    let owner: DataTypes.UserRecordType = DataTypes.nullUser;
                    await axios.get('http://localhost:3001/users/' + item.owner).then(response => {
                        owner = {
                            value: { name: response.data.name, email: response.data.email } as DataTypes.UserValueType,
                            id: response.data.id,
                        };
                    });

                    let language = DataTypes.nullLanguage;
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
        bookId: number,
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        await axios
            .delete('http://localhost:3001/queues?book_id=' + bookId + '&user_id=' + user.id)
            .catch(error => onError(error));
        await axios
            .put('http://localhost:3001/books/' + bookId, {
                state: BookStateTypes.default.STATE_BOOK_IN_TRANSIT_TO_HOLDER,
                holder: user.id,
            })
            .catch(error => onError(error));

        return true;
    }

    public async rejectRental(
        bookId: number,
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ): Promise<boolean> {
        await axios
            .delete('http://localhost:3001/queues?book_id=' + bookId + '&user_id=' + user.id)
            .catch(error => onError(error));
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
        await axios.delete('http://localhost:3001/books/' + bookId).catch(error => onError(error));
    }

    public async getUser(
        user: DataTypes.UserValueType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.UserRecordType> {
        let userData = DataTypes.nullUser;
        await axios
            .get('http://localhost:3001/users?email=' + user.email)
            .then(response => {
                let entry = response.data[0];
                userData.id = entry.id;
                userData.value.name = entry.name;
                userData.value.email = entry.email;
            })
            .catch(error => onError(error));

        return userData;
    }

    public async addBook(
        value: DataTypes.BookValueType,
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ) {
        alert(JSON.stringify(user));
        axios
            .post('http://localhost:3001/books/', {
                author: value.author,
                image: value.image,
                language: value.language.id,
                owner: user.id,
                holder: -1,
                title: value.title,
                state: 'state.book.idle',
            })
            .catch(error => onError(error));
    }

    public async getRentalNotifications(
        user: DataTypes.UserRecordType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.RentalNotificationRecordType[]> {
        var rentalNotifications: DataTypes.RentalNotificationRecordType[] = [];
        await axios
            .get('http://localhost:3001/queues?ownerId=' + user.id)
            .then(response => response.data.json)
            .then(async item => {
                var user: DataTypes.UserRecordType = DataTypes.nullUser;
                await axios
                    .get('http://localhost:3001/users/' + item.userId)
                    .then(response => (user = response.data))
                    .catch(error => onError(error));

                var title = '';
                await axios
                    .get('http://localhost:3001/books/' + item.bookId)
                    .then(response => (title = response.data.title))
                    .catch(error => onError(error));

                let notification: DataTypes.RentalNotificationRecordType = {
                    bookId: item.bookId,
                    value: { bookTitle: title, user: user } as DataTypes.RentalNotificationValue,
                };
                rentalNotifications.push(notification);
            });
        return rentalNotifications;
    }
}
