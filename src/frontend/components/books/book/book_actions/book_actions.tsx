import React from 'react';
import * as DataTypes from '../../../../../shared/types';
import { Aux, withStyle } from '../../../hooks/hooks';
import LikeBook from './like_book';
import BookStateComponent from './book_state';
import BookAvailabilityComponent from './book_availability';

interface Props {
    userdata: DataTypes.UserRecordType;
    book: DataTypes.BookRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];

    likeBook(book: DataTypes.BookRecordType): void;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
}

const BookActions = (props: Props) => {
    return (
        <Aux>
            <BookAvailabilityComponent book={props.book} />
            <div className="book_actions_left">
                <LikeBook {...props} />
            </div>
            <div className="book_actions_right">
                <BookStateComponent {...props} />
            </div>
        </Aux>
    );
};

export default withStyle(BookActions, 'book_actions');
