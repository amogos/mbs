import {
    ACTION_ADD_BOOK,
    ACTION_LIST_BOOKS,
    ACTION_USER_DATA,
    ACTION_ASSIGN_BOOK,
    ACTION_RETURN_BOOK,
    ACTION_GOTO_ADD_BOOK,
    ACTION_GOTO_LIST_BOOKS,
    ACTION_DELETE_BOOK,
} from '../constants/action_constant';
import * as DataTypes from '../types';
import * as Actions from '../actions/index';
import databseInstance from '../connectors/database_instance';
import { booksArray } from '../connectors/database_caches';
import Store from './../store';
import Strings from '../constants/string_constant';
import { message } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function treeReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case ACTION_GOTO_ADD_BOOK:
            return Object.assign({}, state, {
                action: ACTION_GOTO_ADD_BOOK,
            });
        case ACTION_ADD_BOOK:
            databseInstance.addBook(action.data, (resultCode: number) => {
                if (resultCode !== 0) {
                    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED);
                } else {
                    message.success(Strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED);
                    Store.dispatch(Actions.gotoAddBook());
                }
            });
            return Object.assign({}, state, {
                action: ACTION_ADD_BOOK,
            });
        case ACTION_GOTO_LIST_BOOKS:
            databseInstance.querryBooks((resultCode: number) => {
                if (resultCode !== 0) {
                    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED);
                }
                Store.dispatch(Actions.listBooks());
            });
            return Object.assign({}, state, {
                action: ACTION_GOTO_LIST_BOOKS,
            });
        case ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                action: ACTION_LIST_BOOKS,
            });
        case ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata,
            });
        case ACTION_ASSIGN_BOOK: {
            const key: string = action.bookKey;
            const userdata = state.userdata;
            let index = booksArray.findIndex(function(item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            databseInstance.assignBook(index, userdata, (resultCode: number) => {
                if (resultCode !== 0) {
                    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED);
                }
                Store.dispatch(Actions.listBooks());
            });
            return Object.assign({}, state, {
                action: ACTION_ASSIGN_BOOK,
                changingkey: key,
            });
        }
        case ACTION_RETURN_BOOK: {
            const key: string = action.bookKey;
            let index = booksArray.findIndex(function(item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            databseInstance.assignBook(index, booksArray[index].value.owner, () => Store.dispatch(Actions.listBooks()));
            return Object.assign({}, state, {
                action: ACTION_RETURN_BOOK,
                changingkey: key,
            });
        }
        case ACTION_DELETE_BOOK: {
            databseInstance.deleteBook(action.bookKey, (resultCode: number) => {
                if (resultCode !== 0) {
                    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED);
                } else {
                    message.success(Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED);
                    Store.dispatch(Actions.listBooks());
                }
            });
            return Object.assign({}, state, {
                action: ACTION_DELETE_BOOK,
                changingkey: action.bookKey,
            });
        }
        default:
            return state;
    }
}
