import * as ActionTypes from '../constants/action_constant'
import * as CustomTypes from "../types";

export const addBook = (text: string) => ({ type: ActionTypes.ADD_BOOK, text })
export const listBooks = (text: string) => ({ type: ActionTypes.LIST_BOOKS, text })
export const addUserData = (userdata: CustomTypes.UserType) => ({ type: ActionTypes.USER_DATA, userdata })