import React from 'react';
import * as DataTypes from '../../../../../shared/types';
import BookStateCarryOut from './states/book_state_carry_out';
import BookStateReturn from './states/book_state_return';
import BookStateAssigned from './states/book_state_assigned';
import BookStateDelete from './states/book_state_delete';
import BookStateAddToCart from './states/book_state_add_to_cart';

interface Props {
    userdata: DataTypes.UserRecordType;
    book: DataTypes.BookRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];

    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
}

const BookStateComponent = (props: Props) => {
    const bookIsInMyQueue: boolean = props.queueArray.findIndex(item => item.bookId === props.book.id) >= 0;
    const bookIsMine: boolean = props.userdata.id === props.book.owner.id;
    const bookHasHolder: boolean = props.book.holder.id > 0;
    const bookIsAssignedToMe: boolean = props.book.holder.id === props.userdata.id;

    if (bookIsInMyQueue) {
        return <BookStateCarryOut />;
    } else if (bookIsAssignedToMe) {
        return <BookStateReturn {...props} />;
    } else if (bookIsMine) {
        if (bookHasHolder) return <BookStateAssigned />;
        else return <BookStateDelete {...props} />;
    } else {
        return <BookStateAddToCart {...props} />;
    }
};

export default BookStateComponent;
