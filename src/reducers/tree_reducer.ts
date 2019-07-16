import * as ActionConstants from '../constants/action_constant';
import * as DataTypes from '../types';
import { treeAction } from '../actions/';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import Strings from '../constants/string_constant';
import { message } from 'antd';

export class GlobalVars {
    public static booksArray: DataTypes.BookRecordType[];
    public static rentalNotificationsArray: DataTypes.RentalNotificationRecordType[];
    public static languagesArray: DataTypes.LanguageRecordType[];
    public static queueArray: DataTypes.QueueRecordType[];
    public static userData: DataTypes.UserRecordType;
}

export function handleError(resultCode: number): void {
    if (resultCode !== 0) {
        message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED + ' (' + resultCode + ')');
    }
}

const { TreeActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function treeReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case TreeActionConstant.ACTION_GOTO_NOTIFICATIONS:
            return Object.assign({}, state, {
                action: TreeActionConstant.ACTION_GOTO_NOTIFICATIONS,
                notifications: GlobalVars.rentalNotificationsArray,
            });
        case TreeActionConstant.ACTION_GOTO_ADD_BOOK:
            return Object.assign({}, state, {
                action: ActionConstants.default.TreeActionConstant.ACTION_GOTO_ADD_BOOK,
                languages: GlobalVars.languagesArray,
            });
        case TreeActionConstant.ACTION_ADD_BOOK:
            databseInstance.addBook(action.data, handleError);
            return Object.assign({}, state, {
                action: ActionConstants.default.TreeActionConstant.ACTION_ADD_BOOK,
            });
        case TreeActionConstant.ACTION_GOTO_LIST_BOOKS:
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance
                .getQueue(GlobalVars.userData.id, handleError)
                .then((result: DataTypes.QueueRecordType[]) => {
                    GlobalVars.queueArray = result;
                });
            databseInstance.getBooks(handleError).then(result => {
                setTimeout(progressSpinner, 0);
                GlobalVars.booksArray = result;
                Store.dispatch(treeAction.listBooks());
            });

            return Object.assign({}, state, {
                action: TreeActionConstant.ACTION_GOTO_LIST_BOOKS,
            });
        case TreeActionConstant.ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                action: TreeActionConstant.ACTION_LIST_BOOKS,
                booksArray: GlobalVars.booksArray,
                queueArray: GlobalVars.queueArray,
            });

        default:
            databseInstance.getLanguages(handleError).then((result: DataTypes.LanguageRecordType[]) => {
                GlobalVars.languagesArray = result;
            });

            return state;
    }
}
