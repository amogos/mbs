import { getLanguages } from '../endpoints/get_languages';
import { getCategories } from '../endpoints/get_categories';
import { getSpaces } from '../endpoints/get_spaces';
import { getBooks } from '../endpoints/get_books';
import { confirmRental } from '../endpoints/actions/confirm_rental';
import { rejectRental } from '../endpoints/actions/reject_rental';
import { returnBook } from '../endpoints/actions/return_book';
import { askBook } from '../endpoints/actions/ask_book';
import { deleteBook } from '../endpoints/actions/delete_book';
import { getUserRecordTypeFromValueType, getUserRecordTypeFromId } from '../endpoints/get_user';
import { addBook } from '../endpoints/add_book';
import { reviewUser } from '../endpoints/actions/review_user';
import { reviewBook } from '../endpoints/actions/review_book';
import { getQueue } from '../endpoints/get_queue';
import { getReturnNotifications } from '../endpoints/get_return_notifications';
import { getQueueNotifications } from '../endpoints/get_queue_notifications';
import { getReviewsForBook } from '../endpoints/get_reviews_for_book';

export default class JSONConnector {
    public getLanguages = getLanguages;
    public getCategories = getCategories;
    public getSpaces = getSpaces;
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
