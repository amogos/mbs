import React from 'react';
import * as DataTypes from '../../../shared/types';
import { withStyle } from './../aux_component';
import BookComponent from './book/book';

interface Props {
    action: string;
    userdata: DataTypes.UserRecordType;
    bookChangingId: number;
    booksArray: DataTypes.BookRecordType[];
    queueArray: DataTypes.QueueNotificationRecordType[];
    displayBook(bookId: number): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    returnBook(bookId: number): void;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    getReviewsForBook(
        bookId: number,
        callback: (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => void,
    ): void;
    urlparams: DataTypes.UrlParms;
}

const ListBooksComponent = (props: Props) => {
    if (!props.booksArray) {
        return null;
    }

    return props.booksArray.map(item => {
        const bookProps = { ...props, book: item };
        return <BookComponent {...bookProps} />;
    });
};

export default withStyle(ListBooksComponent, 'list_book_component');
