import * as ActionTypes from '../../constants/action_constant';
import * as DataTypes from '../../types';

class PageAction {
    public gotoSpaces = () => ({ type: ActionTypes.default.PageActionConstant.ACTION_GOTO_SPACES });

    public addBook = (data: DataTypes.BookValueType) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_ADD_BOOK,
        data,
    });

    public gotoListBooks = (filters: string[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GOTO_LIST_BOOKS,
        filters,
    });

    public listBooks = () => ({ type: ActionTypes.default.PageActionConstant.ACTION_LIST_BOOKS });

    public gotoNotifications = () => ({ type: ActionTypes.default.PageActionConstant.ACTION_GOTO_NOTIFICATIONS });
}

export default PageAction;
