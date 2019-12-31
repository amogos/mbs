import * as ActionConstants from '../../../shared/constants/action_constant';
import { pageAction } from '../../actions';
import databseInstance from '../../../backend/database_instance';
import Store from '../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { handleError } from '../main_reducer';
import * as DataTypes from '../../../shared/types';

const { BookActionConstant } = ActionConstants.default;

export default function bookReducer(state: any, action: any): any {
    let result = state;

    switch (action.type) {
        case BookActionConstant.ACTION_LIKE_BOOK:
            databseInstance.likeBook(state.userdata.id, action.book, handleError).then(() => {
                Store.dispatch(pageAction.refreshState({ modifiedBook: action.book }));
            });
            break;
        case BookActionConstant.ACTION_ADD_BOOK:
            databseInstance.addBook(state.userdata.id, action.data, action.onSuccess, handleError);
            break;
        case BookActionConstant.ACTION_ASK_BOOK:
            const notification: DataTypes.QueueNotificationValueType = DataTypes.NullQueueNotificationValue();
            notification.bookId = action.bookId;
            notification.ownerId = action.ownerId;
            notification.userId = state.userdata.id;
            notification.duration = action.duration;

            databseInstance.askBook(state.userdata.id, notification, handleError).then(() => {
                databseInstance
                    .getQueue(state.userdata.id, handleError)
                    .then((result: DataTypes.QueueNotificationRecordType[]) => {
                        Store.dispatch(pageAction.refreshState({ queueArray: result, append: false }));
                    });
            });
            result = Object.assign({}, state, {
                action: BookActionConstant.ACTION_ASK_BOOK,
                bookChangingId: action.bookId,
            });
            break;
        case BookActionConstant.ACTION_RETURN_BOOK:
            const bookId: number = action.bookId;
            databseInstance.returnBook(bookId, handleError).then(() => {});
            result = Object.assign({}, state, {
                action: BookActionConstant.ACTION_RETURN_BOOK,
                bookChangingId: bookId,
            });

            break;
        case BookActionConstant.ACTION_REVIEW_BOOK:
            databseInstance.reviewBook(state.userdata.id, action.review, handleError);
            result = Object.assign({}, state, {
                bookChangingId: action.bookId,
            });
            break;
        case BookActionConstant.ACTION_DELETE_BOOK:
            databseInstance.deleteBook(state.userdata.id, action.bookId, handleError).then(() => {
                message.success(Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED);
                let booksArray: DataTypes.BookRecordType[] = state.booksArray;
                const index = booksArray.findIndex(book => book.id === action.bookId);
                const temp = [...booksArray];
                temp.splice(index, 1);
                booksArray = temp;
                Store.dispatch(pageAction.refreshState({ booksArray: booksArray }));
            });

            result = Object.assign({}, state, {
                action: BookActionConstant.ACTION_DELETE_BOOK,
                bookChangingId: action.bookId,
            });
            break;
        default:
            result = null;
    }

    return result;
}
