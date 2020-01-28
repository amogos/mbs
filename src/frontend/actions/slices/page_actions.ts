import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { Action } from 'redux';

/**GetSpacesAction*/
export interface GetSpacesAction extends Action<string> {
    filters: string[];
    callbacks: ((result: DataTypes.Spaces) => void)[];
}
export const getSpaces = (filters: string[], callbacks: ((result: DataTypes.Spaces) => void)[]): GetSpacesAction => ({
    type: ActionTypes.default.PageActionConstant.ACTION_GET_SPACES,
    filters,
    callbacks,
});

/**GetBooksAction*/
export interface GetBooksAction extends Action<string> {
    filters: string[];
    callbacks: ((books: DataTypes.BookRecordType[]) => void)[];
}
export const getBooks = (
    filters: string[],
    callbacks: ((books: DataTypes.BookRecordType[]) => void)[],
): GetBooksAction => ({
    type: ActionTypes.default.PageActionConstant.ACTION_GET_BOOKS,
    filters,
    callbacks,
});

/**GetRentedBooksAction*/
export interface GetRentedBooksAction extends Action<string> {
    userdata: DataTypes.UserRecordType;
    callbacks: ((books: DataTypes.BookRecordType[]) => void)[];
}
export const getRentedBooks = (
    userdata: DataTypes.UserRecordType,
    callbacks: ((books: DataTypes.BookRecordType[]) => void)[],
): GetRentedBooksAction => ({
    type: ActionTypes.default.PageActionConstant.ACTION_GET_RENTED_BOOKS,
    userdata,
    callbacks,
});

/**GetFeedsAction*/
export interface GetFeedsAction extends Action<string> {
    filters: string[];
    callbacks: ((feeds: DataTypes.UserFeedRecordType[]) => void)[];
}
export const getFeeds = (
    filters: string[],
    callbacks: ((feeds: DataTypes.UserFeedRecordType[]) => void)[],
): GetFeedsAction => ({
    type: ActionTypes.default.PageActionConstant.ACTION_GET_FEED,
    filters,
    callbacks,
});

/**GetBookmarksAction*/
export interface GetBookmarksAction extends Action<string> {
    user: DataTypes.UserRecordType;
    callbacks: ((books: DataTypes.BookRecordType[]) => void)[];
}
export const getBookmarks = (
    user: DataTypes.UserRecordType,
    callbacks: ((books: DataTypes.BookRecordType[]) => void)[],
): GetBookmarksAction => ({
    type: ActionTypes.default.PageActionConstant.ACTION_GET_BOOKMARKS,
    user,
    callbacks,
});

/**AddUrlParamsAction*/
export interface AddUrlParamsAction extends Action<string> {
    urlparams: DataTypes.UrlParms;
}
export const addUrlParams = (urlparams: DataTypes.UrlParms): AddUrlParamsAction => ({
    type: ActionTypes.default.PageActionConstant.ACTION_ADD_URL_PARAMS,
    urlparams,
});

/**RefreshStateAction*/
export interface RefreshStateAction extends Action<string> {
    params: any;
}
export const refreshState = (params: any): RefreshStateAction => ({
    type: ActionTypes.default.PageActionConstant.ACTION_REFRESH_STATE,
    params,
});

export type PageAction =
    | GetSpacesAction
    | GetBooksAction
    | GetRentedBooksAction
    | GetFeedsAction
    | GetBookmarksAction
    | AddUrlParamsAction
    | RefreshStateAction;
