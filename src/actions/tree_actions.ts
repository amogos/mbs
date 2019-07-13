import * as ActionTypes from '../constants/action_constant';
import * as DataTypes from '../types';

export const gotoAddBook = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_GOTO_ADD_BOOK });
export const addBook = (data: DataTypes.BookValueType) => ({
    type: ActionTypes.default.TreeActionConstant.ACTION_ADD_BOOK,
    data,
});

export const gotoListBooks = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_GOTO_LIST_BOOKS });
export const listBooks = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_LIST_BOOKS });

export const gotoNotifications = () => ({ type: ActionTypes.default.TreeActionConstant.ACTION_GOTO_NOTIFICATIONS });
