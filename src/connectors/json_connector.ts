import axios from 'axios';
import * as DataTypes from '../types';
import * as BookStateTypes from '../book_states';

export default class JsonConnector {
    public constructor() {
        this.init();
    }

    private init() {}

    public async getBooks(onError: (resultCode: number) => void): Promise<DataTypes.BookRecordType[]> {
        var booksArray: DataTypes.BookRecordType[] = [];
        await axios
            .get('http://localhost:3001/books')
            .then(response => response.data.json)
            .then(async item => {
                let holder: DataTypes.UserType = DataTypes.nullUser;
                if (item.val().holder > 0) {
                    fetch('http://localhost:3001/users/' + item.val().holder)
                        .then(response => response.json())
                        .then(item => {
                            holder = { name: item.name, email: item.email, id: item.id };
                        });
                }

                let owner: DataTypes.UserType = DataTypes.nullUser;
                fetch('http://localhost:3001/users/' + item.val().owner)
                    .then(response => response.json())
                    .then(item => {
                        owner = { name: item.name, email: item.email, id: item.id };
                    });

                let language = DataTypes.nullLanguage;
                fetch('http://localhost:3001/languages/' + item.val().language)
                    .then(response => response.json())
                    .then(item => {
                        language = { language: item.language, id: item.id };
                    });

                let bookValue: DataTypes.BookValueType = {
                    title: item.val().title,
                    image: item.val().image,
                    author: item.val().author,
                    language: language,
                    owner: owner,
                    holder: holder,
                    state: item.val().state,
                };
                booksArray.push({
                    id: item.val().id,
                    value: bookValue,
                } as DataTypes.BookRecordType);
            })
            .catch(error => {
                onError(error);
            });
        return booksArray;
    }

    public async confirmRental(
        bookId: number,
        user: DataTypes.UserType,
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
        user: DataTypes.UserType,
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
        user: DataTypes.UserType,
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

    public async addBook(
        value: DataTypes.BookValueType,
        user: DataTypes.UserType,
        onError: (resultCode: number) => void,
    ) {
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
        user: DataTypes.UserType,
        onError: (resultCode: number) => void,
    ): Promise<DataTypes.RentalNotificationType[]> {
        var rentalNotifications: DataTypes.RentalNotificationType[] = [];
        await axios
            .get('http://localhost:3001/queues?ownerId=' + user.id)
            .then(response => response.data.json)
            .then(async item => {
                var user: DataTypes.UserType = DataTypes.nullUser;
                await axios
                    .get('http://localhost:3001/users/' + item.userId)
                    .then(response => (user = response.data))
                    .catch(error => onError(error));

                var title = '';
                await axios
                    .get('http://localhost:3001/books/' + item.bookId)
                    .then(response => (title = response.data.title))
                    .catch(error => onError(error));

                let notification: DataTypes.RentalNotificationType = {
                    bookId: item.bookId,
                    bookTitle: title,
                    user: user,
                };
                rentalNotifications.push(notification);
            });
        return rentalNotifications;
    }
}
