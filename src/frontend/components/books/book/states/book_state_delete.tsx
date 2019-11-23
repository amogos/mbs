import React from 'react';
import * as DataTypes from '../../../../../shared/types';
import IconText from '../../icon_text';
import { Button } from 'antd';
import * as Strings from '../../../../../shared/constants/string_constant';

interface Props {
    userdata: DataTypes.UserRecordType;
    book: DataTypes.BookRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];

    reviewBook(review: DataTypes.BookReviewValueType): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
}

const BookStateDelete = (props: Props) => {
    const { BookStateStrings } = Strings.default;
    return (
        <Button type="link" onClick={() => props.deleteBook(props.book.id)}>
            <IconText type="transaction" text={BookStateStrings.DELETE_BOOK} />
        </Button>
    );
};

export default BookStateDelete;
