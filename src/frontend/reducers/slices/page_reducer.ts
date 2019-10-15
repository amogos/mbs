import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { pageAction } from '../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { handleError } from './../main_reducer';

const { PageActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function pageReducer(state: any, action: any): any {
    switch (action.type) {
        case PageActionConstant.ACTION_GOTO_SPACES:
            return Object.assign({}, state, {
                action: ActionConstants.default.PageActionConstant.ACTION_GOTO_SPACES,
            });
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance.getQueue(state.userdata.id, handleError).then((result1: DataTypes.QueueRecordType[]) => {
                databseInstance.getBooks(action.filters, handleError).then(result2 => {
                    setTimeout(progressSpinner, 0);
                    Store.dispatch(pageAction.refreshState({ queueArray: result1, append: false }));
                    Store.dispatch(pageAction.refreshState({ booksArray: result2, append: true }));
                    action.callbacks.forEach((callback: (books: DataTypes.BookRecordType[]) => void) =>
                        callback(result2),
                    );
                });
            });

            return Object.assign({}, state, {
                action: PageActionConstant.ACTION_GOTO_LIST_BOOKS,
            });

        case PageActionConstant.ACTION_ADD_URL_PARAMS:
            let shouldResetBooksAray = false;
            const pageChanged: boolean = state.urlparams && state.urlparams.id != action.urlparams.id;
            const categoryChanged =
                state.urlparams &&
                state.urlparams.query.category &&
                action.urlparams.query.category &&
                state.urlparams.query.category != action.urlparams.query.category;

            if (pageChanged || categoryChanged) {
                shouldResetBooksAray = true;
            }

            let stateAppend: any = {
                action: PageActionConstant.ACTION_ADD_URL_PARAMS,
                urlparams: action.urlparams,
            };

            if (shouldResetBooksAray) {
                stateAppend = { ...stateAppend, booksArray: [] };
            }

            return Object.assign({}, state, stateAppend);

        case PageActionConstant.ACTION_REFRESH_STATE:
            if (action.params.booksArray && state.booksArray) {
                if (action.params.append === true)
                    action.params.booksArray = state.booksArray.concat(action.params.booksArray);
            }
            return Object.assign({}, state, action.params);
        default:
            return null;
    }
}
