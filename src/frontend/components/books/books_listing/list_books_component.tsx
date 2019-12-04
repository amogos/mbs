import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../hooks/hooks';
import BookComponent from './book';

interface Props {
    action: string;
    userdata: DataTypes.UserRecordType;
    bookChangingId: number;
    booksArray: DataTypes.BookRecordType[];
    queueArray: DataTypes.QueueNotificationRecordType[];
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    returnBook(bookId: number): void;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    likeBook(book: DataTypes.BookReviewRecordType): void;
    getReviewsForBook(
        bookId: number,
        callback: (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => void,
    ): void;
    bookmarkBook(bookId: number, onSuccess: () => void): void;
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
