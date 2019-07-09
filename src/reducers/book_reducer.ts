import * as BookConstants from '../constants/book_actions_constants';
import * as DataTypes from '../types';
import * as Actions from '../actions/index';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import Strings from '../constants/string_constant';
import { message } from 'antd';
import { GlobalVars, handleResultCode } from './tree_reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function bookReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case BookConstants.ACTION_ASK_BOOK: {
            const key: number = action.bookKey;
            const ownerId: number = action.ownerId;
            const userdata = state.userdata;
            let index = GlobalVars.booksArray.findIndex(function(item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            databseInstance.askBook(index, ownerId, userdata, handleResultCode);
            return Object.assign({}, state, {
                action: BookConstants.ACTION_ASK_BOOK,
                changingkey: key,
            });
        }
        case BookConstants.ACTION_RETURN_BOOK: {
            const key: number = action.bookKey;
            //  TODO: this search needs to go
            let index = GlobalVars.booksArray.findIndex(function(item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            return Object.assign({}, state, {
                action: BookConstants.ACTION_RETURN_BOOK,
                changingkey: key,
            });
        }
        case BookConstants.ACTION_DELETE_BOOK: {
            databseInstance.deleteBook(action.bookKey, (resultCode: number) => {
                if (resultCode !== 0) {
                    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED);
                } else {
                    message.success(Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED);
                    Store.dispatch(Actions.listBooks());
                }
            });
            return Object.assign({}, state, {
                action: BookConstants.ACTION_DELETE_BOOK,
                changingkey: action.bookKey,
            });
        }
        default:
            return state;
    }
}
