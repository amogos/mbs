import * as ActionConstants from '../../../shared/constants/action_constant';
import { pageAction } from '../../actions';
import databseInstance from '../../../backend/database_instance';
import Store from '../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { handleError } from './../main_reducer';
import * as DataTypes from '../../../shared/types';
import { NullBookRecordType } from '../../../shared/types';

const { BookActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function bookReducer(state: any, action: any): any {
    switch (action.type) {
        case BookActionConstant.ACTION_LIKE_REVIEW: {
            databseInstance.updateBookReview(action.review, handleError);
            return state;
        }
        case BookActionConstant.ACTION_LIKE_BOOK: {
            databseInstance.likeBook(action.book, handleError).then(() => {
                Store.dispatch(pageAction.refreshState({ modifiedBook: action.book }));
            });
            return state;
        }
        case BookActionConstant.ACTION_DISPLAY_BOOK: {
            databseInstance.getBookRecordTypeFromId(action.bookId, handleError).then(result => {
                Store.dispatch(pageAction.refreshState({ modifiedBook: result }));
            });
            databseInstance.getReviewsForBook(action.bookId, handleError).then(result => {
                Store.dispatch(pageAction.refreshState({ modifiedBookReviews: result }));
            });

            return Object.assign({}, state, {
                modifiedBook: NullBookRecordType,
                modifiedBookReviews: [],
            });
        }
        case BookActionConstant.ACTION_ADD_BOOK: {
            databseInstance.addBook(action.data, action.onSuccess, handleError);
            return state;
        }
        case BookActionConstant.ACTION_GET_BOOK_DESCRIPTION: {
            databseInstance
                .getBookDescriptionForISBN(action.isbn10, action.isbn13, handleError)
                .then(result => action.callback(result));
            return state;
        }
        case BookActionConstant.ACTION_ASK_BOOK: {
            const notification: DataTypes.QueueNotificationValueType = DataTypes.NullQueueNotificationValue();
            notification.bookId = action.bookId;
            notification.ownerId = action.ownerId;
            notification.userId = state.userdata.id;
            notification.duration = action.duration;

            databseInstance.askBook(notification, handleError).then(() => {});
            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_ASK_BOOK,
                bookChangingId: action.bookId,
            });
        }
        case BookActionConstant.ACTION_RETURN_BOOK: {
            const bookId: number = action.bookId;
            databseInstance.returnBook(bookId, handleError).then(() => {});
            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_RETURN_BOOK,
                bookChangingId: bookId,
            });
        }
        case BookActionConstant.ACTION_REVIEW_BOOK: {
            databseInstance.reviewBook(action.review, handleError);
            return Object.assign({}, state, {
                bookChangingId: action.bookId,
            });
        }
        case BookActionConstant.ACTION_GET_REVIEWS_FOR_BOOK: {
            databseInstance
                .getReviewsForBook(action.bookId, handleError)
                .then(result => action.callback(action.bookId, result));
            return state;
        }
        case BookActionConstant.ACTION_DELETE_BOOK: {
            databseInstance.deleteBook(action.bookId, handleError).then(() => {
                message.success(Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED);
                let booksArray: DataTypes.BookRecordType[] = state.booksArray;
                const index = booksArray.findIndex(book => book.id === action.bookId);
                const temp = [...booksArray];
                temp.splice(index, 1);
                booksArray = temp;
                Store.dispatch(pageAction.refreshState({ booksArray: booksArray }));
            });

            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_DELETE_BOOK,
                bookChangingId: action.bookId,
            });
        }
        default:
            return null;
    }
}
