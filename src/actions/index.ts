import * as ActionTypes from '../constants/action_constant';
import * as DataTypes from '../types';

export const gotoAddBook = () => ({ type: ActionTypes.ACTION_GOTO_ADD_BOOK });
export const addBook = (data: DataTypes.BookValueType) => ({ type: ActionTypes.ACTION_ADD_BOOK, data });

export const gotoListBooks = () => ({ type: ActionTypes.ACTION_GOTO_LIST_BOOKS });
export const listBooks = () => ({ type: ActionTypes.ACTION_LIST_BOOKS });

export const addUserData = (userdata: DataTypes.UserRecordType) => ({ type: ActionTypes.ACTION_USER_DATA, userdata });
export const loginUser = (user: DataTypes.UserValueType) => ({ type: ActionTypes.ACTION_LOGIN_USER, user });

export const askBook = (bookId: number, ownerId: number) => ({ type: ActionTypes.ACTION_ASK_BOOK, bookId, ownerId });

export const returnBook = (bookId: number) => ({
    type: ActionTypes.ACTION_RETURN_BOOK,
    bookId,
});

export const deleteBook = (bookId: number) => ({
    type: ActionTypes.ACTION_DELETE_BOOK,
    bookId,
});

export const gotoNotifications = () => ({ type: ActionTypes.ACTION_GOTO_NOTIFICATIONS });

export const confirmRental = (bookId: number, user: DataTypes.UserRecordType) => ({
    type: ActionTypes.ACTION_CONFIRM_RENTAL,
    bookId,
    user,
});

export const rejectRental = (bookId: number, user: DataTypes.UserRecordType) => ({
    type: ActionTypes.ACTION_REJECT_RENTAL,
    bookId,
    user,
});
