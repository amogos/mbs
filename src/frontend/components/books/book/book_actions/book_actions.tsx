import React from 'react';
import { Button } from 'antd';
import * as DataTypes from '../../../../../shared/types';
import { Aux, withStyle } from '../../../hooks/hooks';
import LikeBook from './../../../../containers/like_book_container';
import BookState from './../../../../containers/book_state_container';

interface Props {
    book: DataTypes.BookRecordType;
    bookmarkBook(bookId: number, onSuccess: () => void): void;
}

const BookActions = (props: Props) => {
    return (
        <Aux>
            <div className="book_actions_left">
                <LikeBook book={props.book} />
                <Button onClick={() => props.bookmarkBook(props.book.id, () => {})}>bookmark</Button>
            </div>
            <div className="book_actions_right">
                <BookState book={props.book} />
            </div>
        </Aux>
    );
};

export default withStyle(BookActions, 'book_actions');
