import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';

class BookAction {
    public addBook = (data: DataTypes.BookValueType, onSuccess: () => void) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_ADD_BOOK,
        data,
        onSuccess,
    });

    public getBookDescription = (
        isbn10: string,
        isbn13: string,
        callback: (description: DataTypes.BookDescriptionRecordType) => void,
    ) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_GET_BOOK_DESCRIPTION,
        isbn10,
        isbn13,
        callback,
    });

    public askBook = (bookId: number, ownerId: number, duration: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_ASK_BOOK,
        bookId,
        ownerId,
        duration,
    });

    public returnBook = (bookId: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_RETURN_BOOK,
        bookId,
    });

    public deleteBook = (bookId: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_DELETE_BOOK,
        bookId,
    });

    public reviewBook = (review: DataTypes.BookReviewRawValueType) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_REVIEW_BOOK,
        review,
    });

    public likeReview = (review: DataTypes.BookReviewRawRecordType) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_LIKE_REVIEW,
        review,
    });

    public likeBook = (book: DataTypes.BookRecordType) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_LIKE_BOOK,
        book,
    });

    public displayBook = (bookId: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_DISPLAY_BOOK,
        bookId,
    });

    public bookmarkBook = (bookId: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_BOOKMARK_BOOK,
        bookId,
    });

    public unbookmarkBook = (bookId: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_UNBOOKMARK_BOOK,
        bookId,
    });

    //  TODO: reevaluate the need of this function.....plus usage of callbacks?!
    public getReviewsForBook = (
        bookId: number,
        callback: (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => void,
    ) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_GET_REVIEWS_FOR_BOOK,
        bookId,
        callback,
    });
}

export default BookAction;
