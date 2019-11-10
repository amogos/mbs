import * as ActionConstants from '../../../shared/constants/action_constant';
import { pageAction } from '../../actions';
import databseInstance from '../../../backend/database_instance';
import Store from '../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { handleError } from './../main_reducer';
import * as DataTypes from '../../../shared/types';

const { BookActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function bookReducer(state: any, action: any): any {
    switch (action.type) {
        case BookActionConstant.ACTION_ADD_BOOK: {
            databseInstance.addBook(action.data, handleError);
            return state;
        }
        case BookActionConstant.ACTION_GET_BOOK_DESCRIPTION: {
            databseInstance
                .getBookDescriptionForISBN(action.isbn10, action.isbn13, handleError)
                .then(result => action.callback(result));
            return state;
        }
        case BookActionConstant.ACTION_ASK_BOOK: {
            const bookId: number = action.bookId;
            const ownerId: number = action.ownerId;
            const userdata = state.userdata;
            const duration = action.duration;

            databseInstance.askBook(bookId, ownerId, userdata, duration, handleError).then(() => {});
            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_ASK_BOOK,
                bookChangingId: bookId,
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
            databseInstance.reviewBook(
                action.bookId,
                state.userdata.id,
                action.comment,
                action.contentScore,
                action.stateScore,
                handleError,
            );
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
