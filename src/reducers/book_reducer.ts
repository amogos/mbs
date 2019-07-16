import * as ActionConstants from '../constants/action_constant';
import * as Actions from '../actions/tree_actions';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import Strings from '../constants/string_constant';
import { message } from 'antd';
import { GlobalVars, handleError } from './tree_reducer';

const { BookActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function bookReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case BookActionConstant.ACTION_ASK_BOOK: {
            const bookId: number = action.bookId;
            const ownerId: number = action.ownerId;
            const userdata = GlobalVars.userData;
            databseInstance.askBook(bookId, ownerId, userdata, handleError).then(() => {
                Store.dispatch(Actions.listBooks());
            });
            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_ASK_BOOK,
                bookChangingId: bookId,
            });
        }
        case BookActionConstant.ACTION_RETURN_BOOK: {
            const bookId: number = action.bookId;
            databseInstance.returnBook(bookId, handleError);
            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_RETURN_BOOK,
                bookChangingId: bookId,
            });
        }
        case BookActionConstant.ACTION_DELETE_BOOK: {
            databseInstance.deleteBook(action.bookId, handleError).then(() => {
                message.success(Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED);
                const index = GlobalVars.booksArray.findIndex(book => book.id === action.bookId);
                let temp = [...GlobalVars.booksArray];
                temp.splice(index, 1);
                GlobalVars.booksArray = temp;
                Store.dispatch(Actions.listBooks());
            });

            return Object.assign({}, state, {
                action: BookActionConstant.ACTION_DELETE_BOOK,
                bookChangingId: action.bookId,
            });
        }
        default:
            return state;
    }
}
