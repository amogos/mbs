import * as ActionTypes from '../constants/action_constant'
import * as DataTypes from "../types";

export const addBook = () => ({ type: ActionTypes.ACTION_ADD_BOOK })
export const listBooks = () => ({ type: ActionTypes.ACTION_LIST_BOOKS })
export const addUserData = (userdata: DataTypes.UserType) => ({ type: ActionTypes.ACTION_USER_DATA, userdata })
export const querryBooksListing = () => ({ type: ActionTypes.ACTION_QUERY_BOOKS_LISTING })
export const assignBook = (book_key: DataTypes.BookKeyType) => ({ type: ActionTypes.ACTION_ASSIGN_BOOK, book_key })
export const returnBook = (book_key: DataTypes.BookKeyType) => ({ type: ActionTypes.ACTION_RETURN_BOOK, book_key })