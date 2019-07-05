import * as ActionTypes from '../constants/action_constant';
import * as DataTypes from '../types';

export const gotoAddBook = () => ({ type: ActionTypes.ACTION_GOTO_ADD_BOOK });
export const addBook = (data: DataTypes.BookValueType) => ({ type: ActionTypes.ACTION_ADD_BOOK, data });

export const gotoListBooks = () => ({ type: ActionTypes.ACTION_GOTO_LIST_BOOKS });
export const listBooks = () => ({ type: ActionTypes.ACTION_LIST_BOOKS });

export const addUserData = (userdata: DataTypes.UserType) => ({ type: ActionTypes.ACTION_USER_DATA, userdata });

export const assignBook = (bookKey: number) => ({ type: ActionTypes.ACTION_ASK_BOOK, bookKey });
export const returnBook = (bookKey: number) => ({ type: ActionTypes.ACTION_RETURN_BOOK, bookKey });

export const deleteBook = (bookKey: number) => ({ type: ActionTypes.ACTION_DELETE_BOOK, bookKey });

export const gotoNotifications = () => ({ type: ActionTypes.ACTION_GOTO_NOTIFICATIONS });

export const confirmRental = (bookKey: number, user: DataTypes.UserType) => ({
    type: ActionTypes.ACTION_CONFIRM_RENTAL,
    bookKey,
    user,
});

export const rejectRental = (bookKey: number, user: DataTypes.UserType) => ({
    type: ActionTypes.ACTION_REJECT_RENTAL,
    bookKey,
    user,
});
