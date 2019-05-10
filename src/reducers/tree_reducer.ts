import {
    ACTION_ADD_BOOK,
    ACTION_LIST_BOOKS,
    ACTION_USER_DATA,
    ACTION_NONE,
    ACTION_ASSIGN_BOOK,
    ACTION_RETURN_BOOK,
    ACTION_GOTO_ADD_BOOK,
    ACTION_GOTO_LIST_BOOKS,
    ACTION_DELETE_BOOK,
    ACTION_CONFIRM_MESSAGE
} from '../constants/action_constant'
import * as DataTypes from "../types"
import * as Actions from '../actions/index'
import dbconnector, { booksArray } from '../connectors/firebase_connector'
import { string } from 'prop-types';
import Store from './../store'
import Strings from '../constants/string_constant';


const initialState = {
    action: ACTION_NONE,
    userdata: DataTypes.nullUser,
    changingkey: string,
}

export default function tree(state = initialState, action: any) {
    switch (action.type) {
        case ACTION_GOTO_ADD_BOOK:
            return Object.assign({}, state, {
                action: ACTION_GOTO_ADD_BOOK,
                message: action.message
            })
        case ACTION_ADD_BOOK:
            dbconnector.addBook(action.data, () => {
                let message = { text: Strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM } as DataTypes.ConfirmationDialogParams;
                Store.dispatch(Actions.gotoAddBook(message));
            });
            return Object.assign({}, state, {
                action: ACTION_ADD_BOOK
            })
        case ACTION_GOTO_LIST_BOOKS:
            dbconnector.querryBooks(() => Store.dispatch(Actions.listBooks()));
            return Object.assign({}, state, {
                action: ACTION_GOTO_LIST_BOOKS
            })
        case ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                action: ACTION_LIST_BOOKS,
                message: action.message
            })
        case ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata
            })
        case ACTION_ASSIGN_BOOK: {
            const key: string = action.book_key;
            const userdata = state.userdata;
            var index = booksArray.findIndex(function (item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            dbconnector.assignBook(index, userdata, () => Store.dispatch(Actions.listBooks()));
            return Object.assign({}, state, {
                action: ACTION_ASSIGN_BOOK,
                changingkey: key
            })
        }
        case ACTION_RETURN_BOOK: {
            const key: string = action.book_key;
            var index = booksArray.findIndex(function (item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            dbconnector.assignBook(index, booksArray[index].value.owner, () => Store.dispatch(Actions.listBooks()));
            return Object.assign({}, state, {
                action: ACTION_RETURN_BOOK,
                changingkey: key
            })
        }
        case ACTION_DELETE_BOOK: {
            dbconnector.deleteBook(action.book_key, () => {
                let message = { text: Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM } as DataTypes.ConfirmationDialogParams;
                Store.dispatch(Actions.listBooks(message));
            });
            return Object.assign({}, state, {
                action: ACTION_DELETE_BOOK,
                changingkey: action.book_key
            })
        }
        case ACTION_CONFIRM_MESSAGE: {
            let result = Object.assign(
                {},
                ...Object.entries(state)
                    .filter(([k]) => k !== 'message')
                    .map(([k, v]) => ({ [k]: v })));
            return result;
        }
        default:
            return state;
    }
}
