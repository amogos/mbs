import * as ActionConstants from '../../../shared/constants/action_constant';
import * as Action from '../../actions';
import databseInstance from '../../../backend/database_instance';
import Store from '../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { handleError } from '../main_reducer';
import * as DataTypes from '../../../shared/types';

const { BookActionConstant } = ActionConstants.default;

export default function bookReducer(state: any, payload: Action.BookAction): any {
    let result = state;

    switch (payload.type) {
        case BookActionConstant.ACTION_LIKE_BOOK:
            {
                const action: Action.LikeBookAction = payload as Action.LikeBookAction;
                databseInstance.likeBook(state.userdata.id, action.book, handleError).then(() => {
                    Store.dispatch(Action.refreshState({ modifiedBook: action.book }));
                });
            }
            break;
        case BookActionConstant.ACTION_ADD_BOOK:
            {
                const action: Action.AddBookAction = payload as Action.AddBookAction;
                databseInstance.addBook(state.userdata.id, action.data, action.onSuccess, handleError);
            }
            break;
        case BookActionConstant.ACTION_ASK_BOOK:
            {
                const action: Action.AskBookAction = payload as Action.AskBookAction;
                const notification: DataTypes.QueueNotificationValueType = DataTypes.NullQueueNotificationValue();
                notification.bookId = action.bookId;
                notification.ownerId = action.ownerId;
                notification.userId = state.userdata.id;
                notification.duration = action.duration;

                databseInstance.askBook(state.userdata.id, notification, handleError).then(() => {
                    databseInstance
                        .getQueue(state.userdata.id, handleError)
                        .then((result: DataTypes.QueueNotificationRecordType[]) => {
                            Store.dispatch(Action.refreshState({ queueArray: result, append: false }));
                        });
                });
                result = Object.assign({}, state, {
                    action: action.type,
                    bookChangingId: action.bookId,
                });
            }
            break;
        case BookActionConstant.ACTION_RETURN_BOOK:
            {
                const action: Action.ReturnBookAction = payload as Action.ReturnBookAction;
                const bookId: number = action.bookId;
                databseInstance.returnBook(bookId, handleError).then(() => {});
                result = Object.assign({}, state, {
                    action: action.type,
                    bookChangingId: bookId,
                });
            }
            break;
        case BookActionConstant.ACTION_REVIEW_BOOK:
            {
                const action: Action.ReviewBookAction = payload as Action.ReviewBookAction;
                databseInstance.reviewBook(state.userdata.id, action.review, handleError);
            }
            break;
        case BookActionConstant.ACTION_DELETE_BOOK:
            {
                const action: Action.DeleteBookAction = payload as Action.DeleteBookAction;
                databseInstance.deleteBook(state.userdata.id, action.bookId, handleError).then(() => {
                    message.success(Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED);
                    let booksArray: DataTypes.BookRecordType[] = state.booksArray;
                    const index = booksArray.findIndex(book => book.id === action.bookId);
                    const temp = [...booksArray];
                    temp.splice(index, 1);
                    booksArray = temp;
                    Store.dispatch(Action.refreshState({ booksArray: booksArray }));
                });

                result = Object.assign({}, state, {
                    action: action.type,
                    bookChangingId: action.bookId,
                });
            }
            break;
        default:
            result = null;
    }

    return result;
}
