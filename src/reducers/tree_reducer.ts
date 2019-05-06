import {
    ACTION_ADD_BOOK,
    ACTION_LIST_BOOKS,
    ACTION_SHOW_BLANK,
    ACTION_USER_DATA,
    ACTION_QUERY_BOOKS_LISTING,
    ACTION_NONE,
    ACTION_ASSIGN_BOOK
} from '../constants/action_constant'
import * as DataTypes from "../types"

import FirebaseConnector from '../connectors/firebase_connector'
import FacebookConnector from '../connectors/facebook_connector'

var booksArray: Array<DataTypes.BookRecordType>;

const initialState = {
    screen: ACTION_SHOW_BLANK,
    action: ACTION_NONE,
    books_array: [],
    userdata: DataTypes.nullUser,
    dbconnector: new FirebaseConnector(),
    socialconnector: new FacebookConnector()
}

export default function tree(state = initialState, action: any) {
    switch (action.type) {
        case ACTION_ADD_BOOK:
            return Object.assign({}, state, {
                screen: ACTION_ADD_BOOK
            })
        case ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                screen: ACTION_LIST_BOOKS,
                books_array: booksArray
            })
        case ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata
            })
        case ACTION_QUERY_BOOKS_LISTING:
            state.dbconnector.getBooks((books: Array<DataTypes.BookRecordType>) => booksArray = books);
            return state;
        case ACTION_ASSIGN_BOOK:
            const key: DataTypes.BookKeyType = action.book_key;
            const userdata = state.userdata;
            var onCompleteCallback = (userdata: DataTypes.UserType) => {
                var index = booksArray.findIndex(function (item: DataTypes.BookRecordType) {
                    return item.id === key.id;
                });
                booksArray[index].value.holder = userdata;
            }
            state.dbconnector.assignBook(key, userdata, onCompleteCallback);
            return state;
        default:
            return state;
    }
}
