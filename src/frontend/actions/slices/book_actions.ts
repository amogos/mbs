import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { Action } from 'redux';

/** AddBookAction*/
export interface AddBookAction extends Action<string> {
    data: DataTypes.BookValueType;
    onSuccess: () => void;
}
export const addBook = (data: DataTypes.BookValueType, onSuccess: () => void): AddBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_ADD_BOOK,
    data,
    onSuccess,
});

/** GetBookDescriptionAction*/
export interface GetBookDescriptionAction extends Action<string> {
    isbn10: string;
    isbn13: string;
    callback: (description: DataTypes.BookDescriptionRecordType) => void;
}
export const getBookDescription = (
    isbn10: string,
    isbn13: string,
    callback: (description: DataTypes.BookDescriptionRecordType) => void,
): GetBookDescriptionAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_GET_BOOK_DESCRIPTION,
    isbn10,
    isbn13,
    callback,
});

/** AskBookAction*/
export interface AskBookAction extends Action<string> {
    bookId: number;
    ownerId: number;
    duration: number;
}
export const askBook = (bookId: number, ownerId: number, duration: number): AskBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_ASK_BOOK,
    bookId,
    ownerId,
    duration,
});

/** ReturnBookAction*/
export interface ReturnBookAction extends Action<string> {
    bookId: number;
}
export const returnBook = (bookId: number): ReturnBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_RETURN_BOOK,
    bookId,
});

/**DeleteBookAction*/
export interface DeleteBookAction extends Action<string> {
    bookId: number;
}
export const deleteBook = (bookId: number): DeleteBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_DELETE_BOOK,
    bookId,
});

/**ReviewBookAction*/
export interface ReviewBookAction extends Action<string> {
    review: DataTypes.BookReviewRawValueType;
}
export const reviewBook = (review: DataTypes.BookReviewRawValueType): ReviewBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_REVIEW_BOOK,
    review,
});

/**LikeBookReviewAction*/
export interface LikeBookReviewAction extends Action<string> {
    review: DataTypes.BookReviewRawRecordType;
}

export const likeReview = (review: DataTypes.BookReviewRawRecordType): LikeBookReviewAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_LIKE_REVIEW,
    review,
});

/**LikeBookAction*/
export interface LikeBookAction extends Action<string> {
    book: DataTypes.BookRecordType;
}
export const likeBook = (book: DataTypes.BookRecordType): LikeBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_LIKE_BOOK,
    book,
});

/**DisplayBookAction*/
export interface DisplayBookAction extends Action<string> {
    bookId: number;
}
export const displayBook = (bookId: number): DisplayBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_DISPLAY_BOOK,
    bookId,
});

/**BookmarkBookAction*/
export interface BookmarkBookAction extends Action<string> {
    bookId: number;
    onSuccess: () => void;
}
export const bookmarkBook = (bookId: number, onSuccess: () => void): BookmarkBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_BOOKMARK_BOOK,
    bookId,
    onSuccess,
});

/**UnBookmarkBookAction*/
export interface UnBookmarkBookAction extends Action<string> {
    bookId: number;
    onSuccess: () => void;
}
export const unbookmarkBook = (bookId: number, onSuccess: () => void): UnBookmarkBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_UNBOOKMARK_BOOK,
    bookId,
    onSuccess,
});

/**GetReviewForBookAction*/
export interface GetReviewForBookAction extends Action<string> {
    bookId: number;
    callback: (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => void;
}
//  TODO: reevaluate the need of this function.....plus usage of callbacks?!
export const getReviewsForBook = (
    bookId: number,
    callback: (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => void,
): GetReviewForBookAction => ({
    type: ActionTypes.default.BookActionConstant.ACTION_GET_REVIEWS_FOR_BOOK,
    bookId,
    callback,
});

export type BookAction =
    | AddBookAction
    | GetBookDescriptionAction
    | AskBookAction
    | ReturnBookAction
    | DeleteBookAction
    | ReviewBookAction
    | LikeBookReviewAction
    | LikeBookAction
    | DisplayBookAction
    | BookmarkBookAction
    | UnBookmarkBookAction
    | GetReviewForBookAction;
