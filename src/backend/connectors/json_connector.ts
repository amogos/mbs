import { getLanguages } from '../endpoints/languages';
import { getCategories } from '../endpoints/categories';
import { getSpaces, getUserSpaces, getOtherSpaces } from '../endpoints/spaces';
import { getBooks } from '../endpoints/books';
import { confirmRental } from '../endpoints/actions/confirm_rental';
import { rejectRental } from '../endpoints/actions/reject_rental';
import { returnBook } from '../endpoints/actions/return_book';
import { askBook } from '../endpoints/actions/ask_book';
import { deleteBook } from '../endpoints/actions/delete_book';
import { getUserRecordTypeFromValueType, getUserRecordTypeFromId } from '../endpoints/user';
import { addBook } from '../endpoints/actions/add_book';
import { reviewUser } from '../endpoints/actions/review_user';
import { reviewBook } from '../endpoints/actions/review_book';
import { getQueue } from '../endpoints/queue';
import { getReturnNotifications } from '../endpoints/return_notifications';
import { getQueueNotifications } from '../endpoints/queue_notifications';
import { getReviewsForBook } from '../endpoints/book_reviews';

export default class JSONConnector {
    public getLanguages = getLanguages;
    public getCategories = getCategories;
    public getSpaces = getSpaces;
    public getUserSpaces = getUserSpaces;
    public getOtherSpaces = getOtherSpaces;

    public getBooks = getBooks;
    public confirmRental = confirmRental;
    public rejectRental = rejectRental;
    public returnBook = returnBook;
    public askBook = askBook;
    public deleteBook = deleteBook;
    public getUserRecordTypeFromValueType = getUserRecordTypeFromValueType;
    public getUserRecordTypeFromId = getUserRecordTypeFromId;
    public addBook = addBook;
    public reviewUser = reviewUser;
    public reviewBook = reviewBook;
    public getQueue = getQueue;
    public getReturnNotifications = getReturnNotifications;
    public getQueueNotifications = getQueueNotifications;
    public getReviewsForBook = getReviewsForBook;

    public constructor() {
        this.init();
    }

    private init() {}
}
