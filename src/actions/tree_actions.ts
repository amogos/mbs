import * as ActionTypes from '../constants/tree_actions_constants';
import * as DataTypes from '../types';

export const gotoAddBook = () => ({ type: ActionTypes.ACTION_GOTO_ADD_BOOK });
export const addBook = (data: DataTypes.BookValueType) => ({ type: ActionTypes.ACTION_ADD_BOOK, data });

export const gotoListBooks = () => ({ type: ActionTypes.ACTION_GOTO_LIST_BOOKS });
export const listBooks = () => ({ type: ActionTypes.ACTION_LIST_BOOKS });

export const gotoNotifications = () => ({ type: ActionTypes.ACTION_GOTO_NOTIFICATIONS });
