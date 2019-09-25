import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';

class BookAction {
    public addBook = (data: DataTypes.BookValueType) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_ADD_BOOK,
        data,
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

    public reviewBook = (bookId: number, comment: string, contentScore: number, stateScore: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_REVIEW_BOOK,
        bookId,
        comment,
        contentScore,
        stateScore,
    });

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