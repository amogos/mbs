import * as ActionTypes from '../constants/action_constant'
import * as DataTypes from "../types";

export const gotoAddBook = () => ({ type: ActionTypes.ACTION_GOTO_ADD_BOOK })
export const addBook = (data: DataTypes.BookValueType) => ({ type: ActionTypes.ACTION_ADD_BOOK, data })

export const gotoListBooks = () => ({ type: ActionTypes.ACTION_GOTO_LIST_BOOKS })
export const listBooks = () => ({ type: ActionTypes.ACTION_LIST_BOOKS })

export const addUserData = (userdata: DataTypes.UserType) => ({ type: ActionTypes.ACTION_USER_DATA, userdata })

export const assignBook = (book_key: DataTypes.BookKeyType) => ({ type: ActionTypes.ACTION_ASSIGN_BOOK, book_key })
export const returnBook = (book_key: DataTypes.BookKeyType) => ({ type: ActionTypes.ACTION_RETURN_BOOK, book_key })