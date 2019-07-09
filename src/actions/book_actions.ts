import * as ActionTypes from '../constants/book_actions_constants';

export const askBook = (bookId: number, ownerId: number) => ({ type: ActionTypes.ACTION_ASK_BOOK, bookId, ownerId });

export const returnBook = (bookId: number) => ({
    type: ActionTypes.ACTION_RETURN_BOOK,
    bookId,
});

export const deleteBook = (bookId: number) => ({
    type: ActionTypes.ACTION_DELETE_BOOK,
    bookId,
});
