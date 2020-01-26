import * as ActionConstants from '../../../shared/constants/action_constant';
import * as Action from '../../actions';
import databseInstance from '../../../backend/database_instance';
import Store from '../store';
import { handleError } from './../main_reducer';
import { NullBookRecordType } from '../../../shared/types';

const { BookActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function bookReducer(state: any, payload: Action.BookActionType): any {
    switch (payload.type) {
        case BookActionConstant.ACTION_LIKE_REVIEW: {
            const action: Action.LikeBookReviewAction = payload as Action.LikeBookReviewAction;
            databseInstance.updateBookReview(action.review, handleError);
            return state;
        }

        case BookActionConstant.ACTION_UNBOOKMARK_BOOK: {
            const action: Action.UnBookmarkBookAction = payload as Action.UnBookmarkBookAction;
            databseInstance.unbookmarkBook(state.userdata, action.bookId, action.onSuccess, handleError).then(() => {
                Store.dispatch(Action.getBookmarks(state.userdata, []));
            });
            return state;
        }
        case BookActionConstant.ACTION_BOOKMARK_BOOK: {
            const action: Action.BookmarkBookAction = payload as Action.BookmarkBookAction;
            databseInstance.bookmarkBook(state.userdata, action.bookId, action.onSuccess, handleError).then(() => {
                Store.dispatch(Action.getBookmarks(state.userdata, []));
            });
            return state;
        }
        case BookActionConstant.ACTION_GET_REVIEWS_FOR_BOOK: {
            const action: Action.GetReviewForBookAction = payload as Action.GetReviewForBookAction;
            databseInstance
                .getReviewsForBook(action.bookId, handleError)
                .then(result => action.callback(action.bookId, result));
            return state;
        }
        case BookActionConstant.ACTION_GET_BOOK_DESCRIPTION: {
            const action: Action.GetBookDescriptionAction = payload as Action.GetBookDescriptionAction;
            databseInstance
                .getBookDescriptionForISBN(action.isbn10, action.isbn13, handleError)
                .then(result => action.callback(result));
            return state;
        }

        case BookActionConstant.ACTION_DISPLAY_BOOK: {
            const action: Action.DisplayBookAction = payload as Action.DisplayBookAction;
            databseInstance.getBookRecordTypeFromId(action.bookId, handleError).then(result => {
                Store.dispatch(Action.refreshState({ modifiedBook: result }));
            });
            databseInstance.getReviewsForBook(action.bookId, handleError).then(result => {
                Store.dispatch(Action.refreshState({ modifiedBookReviews: result }));
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
