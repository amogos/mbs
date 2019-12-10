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
        case PageActionConstant.ACTION_GET_BOOKMARKS: {
            databseInstance.getBookmarks(state.userdata, handleError).then(result => {
                Store.dispatch(pageAction.refreshState({ userBookmarks: result, append: false }));
                action.callbacks.forEach((callback: (books: DataTypes.BookRecordType[]) => void) => callback(result));
            });
            return state;
        }
        case PageActionConstant.ACTION_GOTO_LIST_SPACES: {
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance
                .getSplitSpaces(state.userdata, action.filters, handleError)
                .then((result: { userSpaces: DataTypes.SpaceType[]; otherSpaces: DataTypes.SpaceType[] }) => {
                    setTimeout(progressSpinner, 0);
                    Store.dispatch(pageAction.getBookmarks(state.userdata, []));
                    Store.dispatch(pageAction.refreshState({ userSpaces: result.userSpaces, append: false }));
                    Store.dispatch(pageAction.refreshState({ otherSpaces: result.otherSpaces, append: true }));
                });

            databseInstance.getFeeds(handleError).then((result: DataTypes.UserFeedRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ userfeed: result }));
            });

            return Object.assign({}, state, {
                action: ActionConstants.default.PageActionConstant.ACTION_GOTO_LIST_SPACES,
            });
        }
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS: {
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance
                .getQueue(state.userdata.id, handleError)
                .then((result1: DataTypes.QueueNotificationRecordType[]) => {
                    databseInstance.getBooks(action.filters, handleError).then(result2 => {
                        setTimeout(progressSpinner, 0);
                        Store.dispatch(pageAction.getBookmarks(state.userdata, []));
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
        }

        case PageActionConstant.ACTION_ADD_URL_PARAMS: {
            let shouldResetBooksArray = false;
            let shouldResetSpacesArray = false;

            const pageChanged: boolean = state.urlparams && state.urlparams.id != action.urlparams.id;
            const queryChanged = state.urlparams && state.urlparams.query !== action.urlparams.query;

            if (pageChanged || queryChanged) {
                shouldResetBooksArray = true;
                shouldResetSpacesArray = true;
            }

            let stateAppend: {
                action: string;
                urlparams: DataTypes.UrlParms;
                booksArray?: DataTypes.BookRecordType[];
                otherSpaces?: DataTypes.SpaceType[];
            } = {
                action: PageActionConstant.ACTION_ADD_URL_PARAMS,
                urlparams: action.urlparams,
            };

            if (shouldResetBooksArray) {
                stateAppend = { ...stateAppend, booksArray: [] };
            }

            if (shouldResetSpacesArray) {
                stateAppend = { ...stateAppend, otherSpaces: [] };
            }

            return Object.assign({}, state, stateAppend);
        }

        case PageActionConstant.ACTION_REFRESH_STATE: {
            const shouldAppendBooks: boolean =
                action.params.booksArray && state.booksArray && action.params.append === true;
            if (shouldAppendBooks) {
                const hasDuplicates =
                    state.booksArray.length > 0 &&
                    action.params.booksArray.length > 0 &&
                    state.booksArray[state.booksArray.length - 1].id ===
                        action.params.booksArray[action.params.booksArray.length - 1].id;

                if (!hasDuplicates) {
                    action.params.booksArray = state.booksArray.concat(action.params.booksArray);
                }
            }

            const shouldAppendSpaces: boolean =
                state.otherSpaces && action.params.otherSpaces && action.params.append === true;
            if (shouldAppendSpaces) {
                action.params.otherSpaces = state.otherSpaces.concat(action.params.otherSpaces);
            }

            return Object.assign({}, state, action.params);
        }
        default:
            return null;
    }
}
