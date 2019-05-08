import {
    ACTION_ADD_BOOK,
    ACTION_LIST_BOOKS,
    ACTION_USER_DATA,
    ACTION_NONE,
    ACTION_ASSIGN_BOOK,
    ACTION_RETURN_BOOK,
    ACTION_GOTO_ADD_BOOK,
    ACTION_GOTO_LIST_BOOKS
} from '../constants/action_constant'
import * as DataTypes from "../types"

import dbconnector from '../connectors/firebase_connector'
import { string } from 'prop-types';


const initialState = {
    action: ACTION_NONE,
    userdata: DataTypes.nullUser,
    changingkey: string
}

export default function tree(state = initialState, action: any) {
    switch (action.type) {
        case ACTION_GOTO_ADD_BOOK:
            return Object.assign({}, state, {
                action: ACTION_GOTO_ADD_BOOK
            })
        case ACTION_ADD_BOOK:
            dbconnector.addBook(action.data);
            return Object.assign({}, state, {
                action: ACTION_ADD_BOOK
            })
        case ACTION_GOTO_LIST_BOOKS:
            dbconnector.querryBooks();
            return Object.assign({}, state, {
                action: ACTION_GOTO_LIST_BOOKS
            })
        case ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                action: ACTION_LIST_BOOKS
            })
        case ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata
            })
        case ACTION_ASSIGN_BOOK: {
            const key: string = action.book_key;
            const userdata = state.userdata;
            const booksArray = dbconnector.getBooks();
            var index = booksArray.findIndex(function (item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            dbconnector.assignBook(index, userdata);
            return Object.assign({}, state, {
                action: ACTION_ASSIGN_BOOK,
                changingkey: key
            })
        }
        case ACTION_RETURN_BOOK: {
            const key: string = action.book_key;
            const booksArray = dbconnector.getBooks();
            var index = booksArray.findIndex(function (item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            dbconnector.assignBook(index, booksArray[index].value.owner);
            return Object.assign({}, state, {
                action: ACTION_RETURN_BOOK,
                changingkey: key
            })
        }
        default:
            return state;
    }
}
