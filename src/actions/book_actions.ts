import * as ActionTypes from '../constants/action_constant';

export const askBook = (bookId: number, ownerId: number) => ({
    type: ActionTypes.default.BookActionConstant.ACTION_ASK_BOOK,
    bookId,
    ownerId,
});

export const returnBook = (bookId: number) => ({
    type: ActionTypes.default.BookActionConstant.ACTION_RETURN_BOOK,
    bookId,
});

export const deleteBook = (bookId: number) => ({
    type: ActionTypes.default.BookActionConstant.ACTION_DELETE_BOOK,
    bookId,
});
