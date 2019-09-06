import * as ActionConstants from '../../constants/action_constant';
import * as DataTypes from '../../types';
import { pageAction } from '../../actions';
import databseInstance from '../../backend/database_instance';
import Store from '../../store';
import Strings from '../../constants/string_constant';
import { message } from 'antd';

export class GlobalVars {
    public static booksArray: DataTypes.BookRecordType[];
    public static languagesArray: DataTypes.LanguageRecordType[];
    public static categoriesArray: DataTypes.CategoryRecordType[];
    public static queueArray: DataTypes.QueueRecordType[];
    public static spacesArray: DataTypes.SpaceType[];
}

export function handleError(resultCode: number): void {
    if (resultCode !== 0) {
        message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED + ' (' + resultCode + ')');
    }
}

const { PageActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function pageReducer(state: any, action: any): any {
    switch (action.type) {
        case PageActionConstant.ACTION_GOTO_NOTIFICATIONS:
            return Object.assign({}, state, {
                action: PageActionConstant.ACTION_GOTO_NOTIFICATIONS,
            });
        case PageActionConstant.ACTION_GOTO_SPACES:
            return Object.assign({}, state, {
                action: ActionConstants.default.PageActionConstant.ACTION_GOTO_SPACES,
                spaces: GlobalVars.spacesArray,
            });
        case PageActionConstant.ACTION_ADD_BOOK:
            databseInstance.addBook(action.data, handleError);
            return Object.assign({}, state, {
                action: ActionConstants.default.PageActionConstant.ACTION_ADD_BOOK,
            });
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance.getQueue(state.userdata.id, handleError).then((result: DataTypes.QueueRecordType[]) => {
                GlobalVars.queueArray = result;
                databseInstance.getBooks(action.filters, handleError).then(result => {
                    setTimeout(progressSpinner, 0);
                    GlobalVars.booksArray = result;
                    Store.dispatch(pageAction.listBooks());
                });
            });
            return Object.assign({}, state, {
                action: PageActionConstant.ACTION_GOTO_LIST_BOOKS,
                filters: action.filters,
                categories: GlobalVars.categoriesArray,
                languages: GlobalVars.languagesArray,
            });
        case PageActionConstant.ACTION_LIST_BOOKS:
            return Object.assign({}, state, {
                action: PageActionConstant.ACTION_LIST_BOOKS,
                booksArray: GlobalVars.booksArray,
                queueArray: GlobalVars.queueArray,
                languages: GlobalVars.languagesArray,
            });
        default:
            databseInstance.getLanguages(handleError).then((result: DataTypes.LanguageRecordType[]) => {
                GlobalVars.languagesArray = result;
            });
            databseInstance.getCategories(handleError).then((result: DataTypes.CategoryRecordType[]) => {
                GlobalVars.categoriesArray = result;
            });
            databseInstance.getSpaces(handleError).then((result: DataTypes.SpaceType[]) => {
                GlobalVars.spacesArray = result;
            });
            return null;
    }
}
