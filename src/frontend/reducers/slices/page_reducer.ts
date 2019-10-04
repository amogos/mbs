import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { pageAction } from '../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { handleError } from './../main_reducer';

const { PageActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function pageReducer(state: any, action: any): any {
    switch (action.type) {
        case PageActionConstant.ACTION_GOTO_NOTIFICATIONS:
            return Object.assign({}, state, {
                page: PageActionConstant.ACTION_GOTO_NOTIFICATIONS,
                action: PageActionConstant.ACTION_GOTO_NOTIFICATIONS,
            });
        case PageActionConstant.ACTION_GOTO_SPACES:
            return Object.assign({}, state, {
                page: ActionConstants.default.PageActionConstant.ACTION_GOTO_SPACES,
                action: ActionConstants.default.PageActionConstant.ACTION_GOTO_SPACES,
            });
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance.getQueue(state.userdata.id, handleError).then((result1: DataTypes.QueueRecordType[]) => {
                databseInstance.getBooks(action.filters, handleError).then(result2 => {
                    setTimeout(progressSpinner, 0);
                    Store.dispatch(pageAction.refreshState({ queueArray: result1, booksArray: result2 }));
                });
            });

            return Object.assign({}, state, {
                page: PageActionConstant.ACTION_GOTO_LIST_BOOKS,
                action: PageActionConstant.ACTION_GOTO_LIST_BOOKS,
                filters: action.filters,
            });

        case PageActionConstant.ACTION_REFRESH_STATE:
            return Object.assign({}, state, action.append);
        default:
            return null;
    }
}
