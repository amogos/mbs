import * as ActionTypes from '../../constants/action_constant';
import * as DataTypes from '../../types';

class TreeAction {
    public gotoAddBook = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_GOTO_ADD_BOOK });
    public addBook = (data: DataTypes.BookValueType) => ({
        type: ActionTypes.default.TreeActionConstant.ACTION_ADD_BOOK,
        data,
    });

    public gotoListBooks = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_GOTO_LIST_BOOKS });
    public listBooks = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_LIST_BOOKS });

    public gotoNotifications = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_GOTO_NOTIFICATIONS });
}

export default TreeAction;
