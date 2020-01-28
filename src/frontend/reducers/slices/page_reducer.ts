import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import databseInstance from './../../../backend/database_instance';
import Store from '../store';
import Strings from '../../../shared/constants/string_constant';
import { message } from 'antd';
import { handleError } from './../main_reducer';
import * as Action from './../../actions/index';
import { GetBooksAction, GetBookmarksAction } from './../../actions/index';
const { PageActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function pageReducer(state: any, payload: Action.PageAction): any {
    switch (payload.type) {
        case PageActionConstant.ACTION_GET_BOOKMARKS: {
            const action: Action.GetBookmarksAction = payload as Action.GetBookmarksAction;
            databseInstance.getBookmarks(state.userdata, handleError).then(result => {
                Store.dispatch(Action.refreshState({ userBookmarks: result, append: false }));
                action.callbacks.forEach((callback: (books: DataTypes.BookRecordType[]) => void) => callback(result));
            });
            return state;
        }
        case PageActionConstant.ACTION_GET_RENTED_BOOKS: {
            const action: Action.GetRentedBooksAction = payload as Action.GetRentedBooksAction;
            databseInstance.getBooksRentedByUser(state.userdata, handleError).then(result => {
                Store.dispatch(Action.refreshState({ userRentedBooks: result, append: false }));
                action.callbacks.forEach((callback: (books: DataTypes.BookRecordType[]) => void) => callback(result));
            });
            return state;
        }
        case PageActionConstant.ACTION_GET_SPACES: {
            const action: Action.GetSpacesAction = payload as Action.GetSpacesAction;
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance
                .getSplitSpaces(state.userdata, action.filters, handleError)
                .then((result: { userSpaces: DataTypes.SpaceType[]; otherSpaces: DataTypes.SpaceType[] }) => {
                    setTimeout(progressSpinner, 0);
                    Store.dispatch(Action.getBookmarks(state.userdata, []));
                    Store.dispatch(Action.refreshState({ userSpaces: result.userSpaces, append: false }));
                    Store.dispatch(Action.refreshState({ otherSpaces: result.otherSpaces, append: true }));
                    action.callbacks.forEach((callback: (result: DataTypes.Spaces) => void) => callback(result));
                });
            return Object.assign({}, state, {
                action: action.type,
            });
        }
        case PageActionConstant.ACTION_GET_BOOKS: {
            const action: Action.GetBooksAction = payload as Action.GetBooksAction;
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance.getBooks(action.filters, handleError).then(result2 => {
                setTimeout(progressSpinner, 0);
                Store.dispatch(Action.refreshState({ booksArray: result2, append: true }));
                action.callbacks.forEach((callback: (books: DataTypes.BookRecordType[]) => void) => callback(result2));
            });
            return Object.assign({}, state, {
                action: action.type,
            });
        }

        case PageActionConstant.ACTION_GET_FEED: {
            const action: Action.GetFeedsAction = payload as Action.GetFeedsAction;
            const progressSpinner = message.loading(Strings.MYBOOKSHELVE_ACTION_IN_PROGRESS);
            databseInstance
                .getFeeds(state.userdata.id, action.filters, handleError)
                .then((result: DataTypes.UserFeedRecordType[]) => {
                    setTimeout(progressSpinner, 0);
                    const append = (action.filters as string[]).includes('_start=0') === false;
                    Store.dispatch(Action.refreshState({ userFeed: result, append: append }));
                    action.callbacks.forEach((callback: (feeds: DataTypes.UserFeedRecordType[]) => void) =>
                        callback(result),
                    );
                });

            return Object.assign({}, state, {
                action: action.type,
            });
        }

        case PageActionConstant.ACTION_ADD_URL_PARAMS: {
            const action: Action.AddUrlParamsAction = payload as Action.AddUrlParamsAction;
            let shouldResetBooksArray = false;

            const pageChanged: boolean = state.urlparams && state.urlparams.id !== action.urlparams.id;
            const queryChanged = state.urlparams && state.urlparams.query !== action.urlparams.query;

            if (pageChanged || queryChanged) {
                shouldResetBooksArray = true;
            }

            let stateAppend: {
                action: string;
                urlparams: DataTypes.UrlParms;
                booksArray?: DataTypes.BookRecordType[];
            } = {
                action: action.type,
                urlparams: action.urlparams,
            };

            if (shouldResetBooksArray) {
                stateAppend = { ...stateAppend, booksArray: [] };
            }

            return Object.assign({}, state, stateAppend);
        }

        case PageActionConstant.ACTION_REMOVE_KEY: {
            const action: Action.RemoveKeyAction = payload as Action.RemoveKeyAction;
            return Object.assign(
                {},
                ...Object.entries(state)
                    .filter(([k]) => k !== action.key)
                    .map(([k, v]) => ({ [k]: v })),
            );
        }

        case PageActionConstant.ACTION_REFRESH_STATE: {
            const action: Action.RefreshStateAction = payload as Action.RefreshStateAction;
            const shouldAppendBooks: boolean =
                action.params.booksArray && state.booksArray && action.params.append === true;
            if (shouldAppendBooks) {
                action.params.booksArray = state.booksArray.concat(action.params.booksArray);
            }

            const shouldAppendSpaces: boolean =
                state.otherSpaces && action.params.otherSpaces && action.params.append === true;
            if (shouldAppendSpaces) {
                action.params.otherSpaces = state.otherSpaces.concat(action.params.otherSpaces);
            }

            const shouldAppendFeed: boolean = state.userFeed && action.params.append === true && action.params.userFeed;
            if (shouldAppendFeed) {
                action.params.userFeed = state.userFeed.concat(action.params.userFeed);
            }

            return Object.assign({}, state, action.params);
        }
        default:
            return null;
    }
}
