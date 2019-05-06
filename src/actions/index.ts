import * as ActionTypes from '../constants/action_constant'
import * as CustomTypes from "../types";

export const addBook = () => ({ type: ActionTypes.ACTION_ADD_BOOK })
export const listBooks = () => ({ type: ActionTypes.ACTION_LIST_BOOKS })
export const addUserData = (userdata: CustomTypes.UserType) => ({ type: ActionTypes.ACTION_USER_DATA, userdata })
export const querryBooksListing = () => ({ type: ActionTypes.ACTION_QUERY_BOOKS_LISTING })