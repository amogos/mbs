import * as ActionConstants from '../constants/action_constant';
import * as DataTypes from '../types';
import * as Actions from '../actions/index';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import Strings from '../constants/string_constant';
import { message } from 'antd';

var booksArray: DataTypes.BookRecordType[];
var rentalNotifications: DataTypes.RentalNotificationType[];

function handleResultCode(resultCode: number): void {
    if (resultCode !== 0) {
        message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED + ' (' + resultCode + ')');
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function treeReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case ActionConstants.ACTION_CONFIRM_RENTAL:
            databseInstance.confirmRental(action.bookKey, action.user, handleResultCode).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleResultCode).then(result => {
                    rentalNotifications = result;
                    Store.dispatch(Actions.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_CONFIRM_RENTAL,
                notifications: rentalNotifications,
            });
        case ActionConstants.ACTION_REJECT_RENTAL:
            databseInstance.rejectRental(action.bookKey, action.user, handleResultCode).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleResultCode).then(result => {
                    rentalNotifications = result;
                    Store.dispatch(Actions.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_REJECT_RENTAL,
                notifications: rentalNotifications,
            });
        case ActionConstants.ACTION_GOTO_NOTIFICATIONS:
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_GOTO_NOTIFICATIONS,
                notifications: rentalNotifications,
            });
        case ActionConstants.ACTION_GOTO_ADD_BOOK:
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_GOTO_ADD_BOOK,
            });
        case ActionConstants.ACTION_ADD_BOOK:
            databseInstance.addBook(action.data, state.userdata, handleResultCode).then(() => {
                databseInstance.getBooks(handleResultCode).then(result => {
                    booksArray = result;
                    Store.dispatch(Actions.gotoAddBook);
                });
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_ADD_BOOK,
            });
        case ActionConstants.ACTION_GOTO_LIST_BOOKS:
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance.getBooks(handleResultCode).then(result => {
                alert(JSON.stringify(result));
                setTimeout(progressSpinner, 0);
                booksArray = result;
                Store.dispatch(Actions.listBooks());
            });

            return Object.assign({}, state, {
                action: ActionConstants.ACTION_GOTO_LIST_BOOKS,
            });
        case ActionConstants.ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_LIST_BOOKS,
                booksArray: booksArray,
            });
        case ActionConstants.ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata,
            });
        case ActionConstants.ACTION_ASK_BOOK: {
            const key: number = action.bookKey;
            const ownerId: number = action.ownerId;
            const userdata = state.userdata;
            let index = booksArray.findIndex(function(item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            databseInstance.askBook(index, ownerId, userdata, handleResultCode);
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_ASK_BOOK,
                changingkey: key,
            });
        }
        case ActionConstants.ACTION_RETURN_BOOK: {
            const key: number = action.bookKey;
            let index = booksArray.findIndex(function(item: DataTypes.BookRecordType) {
                return item.id === key;
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_RETURN_BOOK,
                changingkey: key,
            });
        }
        case ActionConstants.ACTION_DELETE_BOOK: {
            databseInstance.deleteBook(action.bookKey, (resultCode: number) => {
                if (resultCode !== 0) {
                    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED);
                } else {
                    message.success(Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED);
                    Store.dispatch(Actions.listBooks());
                }
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_DELETE_BOOK,
                changingkey: action.bookKey,
            });
        }
        default:
            return state;
    }
}
