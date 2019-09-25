import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { pageAction } from '../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { GlobalVars, handleError } from './../main_reducer';

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
                spaces: GlobalVars.spacesArrays,
                categories: GlobalVars.categoriesArray,
                languages: GlobalVars.languagesArray,
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

            return null;
    }
}