import * as types from '../constants/action_constant'

export const addBook = (text: string) => ({ type: types.ADD_BOOK, text })
export const listBooks = (text: string) => ({ type: types.LIST_BOOKS, text })