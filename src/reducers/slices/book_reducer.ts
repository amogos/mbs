import * as ActionConstants from '../../constants/action_constant';
import { pageAction } from '../../actions';
import databseInstance from '../../backend/database_instance';
import Store from '../../store';
import Strings from '../../constants/string_constant';
import { message } from 'antd';
import { GlobalVars, handleError } from './page_reducer';

const { BookActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function bookReducer(state: any, action: any): any {
    switch (action.type) {
        case BookActionConstant.ACTION_ASK_BOOK: {
            const bookId: number = action.bookId;
            const ownerId: number = action.ownerId;
            const userdata = state.userdata;
            const duration = action.duration;

            databseInstance.askBook(bookId, ownerId, userdata, duration, handleError).then(() => {
                Store.dispatch(pageAction.gotoListBooks(state.filters));
            });
            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_ASK_BOOK,
                bookChangingId: bookId,
            });
        }
        case BookActionConstant.ACTION_RETURN_BOOK: {
            const bookId: number = action.bookId;
            databseInstance.returnBook(bookId, handleError).then(() => {
                Store.dispatch(pageAction.gotoListBooks(state.filters));
            });
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
                const index = GlobalVars.booksArray.findIndex(book => book.id === action.bookId);
                let temp = [...GlobalVars.booksArray];
                temp.splice(index, 1);
                GlobalVars.booksArray = temp;
                Store.dispatch(pageAction.listBooks());
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
