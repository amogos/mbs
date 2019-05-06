import * as ActionTypes from '../constants/action_constant'
import * as CustomTypes from "../types";

export const addBook = () => ({ type: ActionTypes.ADD_BOOK })
export const listBooks = () => ({ type: ActionTypes.LIST_BOOKS })
export const addUserData = (userdata: CustomTypes.UserType) => ({ type: ActionTypes.USER_DATA, userdata })