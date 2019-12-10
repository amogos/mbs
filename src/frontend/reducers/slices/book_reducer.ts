import * as ActionConstants from '../../../shared/constants/action_constant';
import { pageAction } from '../../actions';
import databseInstance from '../../../backend/database_instance';
import Store from '../store';
import { handleError } from './../main_reducer';
import { NullBookRecordType } from '../../../shared/types';

const { BookActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function bookReducer(state: any, action: any): any {
    switch (action.type) {
        case BookActionConstant.ACTION_LIKE_REVIEW: {
            databseInstance.updateBookReview(action.review, handleError);
            return state;
        }

        case BookActionConstant.ACTION_UNBOOKMARK_BOOK: {
            databseInstance.unbookmarkBook(state.userdata, action.bookId, action.onSuccess, handleError).then(() => {
                Store.dispatch(pageAction.getBookmarks(state.userdata, []));
            });
            return state;
        }
        case BookActionConstant.ACTION_BOOKMARK_BOOK: {
            databseInstance.bookmarkBook(state.userdata, action.bookId, action.onSuccess, handleError).then(() => {
                Store.dispatch(pageAction.getBookmarks(state.userdata, []));
            });
            return state;
        }
        case BookActionConstant.ACTION_GET_REVIEWS_FOR_BOOK: {
            databseInstance
                .getReviewsForBook(action.bookId, handleError)
                .then(result => action.callback(action.bookId, result));
            return state;
        }
        case BookActionConstant.ACTION_GET_BOOK_DESCRIPTION: {
            databseInstance
                .getBookDescriptionForISBN(action.isbn10, action.isbn13, handleError)
                .then(result => action.callback(result));
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

        default:
            return null;
    }
}
