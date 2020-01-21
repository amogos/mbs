import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';

class PageAction {
    public getSpaces = (filters: string[], callbacks: ((result: DataTypes.Spaces) => void)[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GET_SPACES,
        filters,
        callbacks,
    });

    public getBooks = (filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GET_BOOKS,
        filters,
        callbacks,
    });

    public getRentedBooks = (
        userdata: DataTypes.UserRecordType,
        callbacks: ((books: DataTypes.BookRecordType[]) => void)[],
    ) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GET_RENTED_BOOKS,
        userdata,
        callbacks,
    });

    public getFeeds = (filters: string[], callbacks: ((feeds: DataTypes.UserFeedRecordType[]) => void)[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GET_FEED,
        filters,
        callbacks,
    });

    public getBookmarks = (
        user: DataTypes.UserRecordType,
        callbacks: ((books: DataTypes.BookRecordType[]) => void)[],
    ) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GET_BOOKMARKS,
        user,
        callbacks,
    });

    public addUrlParams = (urlparams: DataTypes.UrlParms) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_ADD_URL_PARAMS,
        urlparams,
    });

    public refreshState = (params: any) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_REFRESH_STATE,
        params,
    });

    public removeKey = (key: string) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_REMOVE_KEY,
        key,
    });
}

export default PageAction;
