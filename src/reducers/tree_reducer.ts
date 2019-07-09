import * as ActionConstants from '../constants/tree_actions_constants';
import * as DataTypes from '../types';
import * as Actions from '../actions/tree_actions';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import Strings from '../constants/string_constant';
import { message } from 'antd';

export class GlobalVars {
    public static booksArray: DataTypes.BookRecordType[];
    public static rentalNotifications: DataTypes.RentalNotificationRecordType[];
}

export function handleResultCode(resultCode: number): void {
    if (resultCode !== 0) {
        message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED + ' (' + resultCode + ')');
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function treeReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case ActionConstants.ACTION_GOTO_NOTIFICATIONS:
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_GOTO_NOTIFICATIONS,
                notifications: GlobalVars.rentalNotifications,
            });
        case ActionConstants.ACTION_GOTO_ADD_BOOK:
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_GOTO_ADD_BOOK,
            });
        case ActionConstants.ACTION_ADD_BOOK:
            databseInstance.addBook(action.data, state.userdata, handleResultCode).then(() => {
                databseInstance.getBooks(handleResultCode).then(result => {
                    GlobalVars.booksArray = result;
                    Store.dispatch(Actions.gotoAddBook);
                });
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_ADD_BOOK,
            });
        case ActionConstants.ACTION_GOTO_LIST_BOOKS:
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance.getBooks(handleResultCode).then(result => {
                setTimeout(progressSpinner, 0);
                GlobalVars.booksArray = result;
                Store.dispatch(Actions.listBooks());
            });

            return Object.assign({}, state, {
                action: ActionConstants.ACTION_GOTO_LIST_BOOKS,
            });
        case ActionConstants.ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_LIST_BOOKS,
                booksArray: GlobalVars.booksArray,
            });

        default:
            return state;
    }
}
