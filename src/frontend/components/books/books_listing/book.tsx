import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Rate } from 'antd';
import BooksDescription from '../book/book_description';
import { Aux, withStyle } from '../../hooks/hooks';
import * as DataTypes from '../../../../shared/types';
import BookActions from '../book/book_actions/book_actions';

interface ReviewState {
    reviews: DataTypes.BookReviewRecordType[];
    visibility: boolean;
}

interface Props {
    userdata: DataTypes.UserRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];
    book: DataTypes.BookRecordType;
    likeBook(book: DataTypes.BookRecordType): void;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
    history: any;
}

const BookComponent = (props: Props) => {
    const item = props.book;

    const onBookTitleCliked = () => {
        props.history.push(`/book?id=${item.id}`);
    };

    return (
        <Aux key={`k${item.id}`}>
            <div className="book_left">
                <img alt="logo" src={item.image} />
            </div>
            <div className="book_right">
                <Button className="book_title" type="link" onClick={onBookTitleCliked}>
                    {item.title} by {item.author.toString()}
                    <span className="book_rating">
                        <Rate disabled defaultValue={item.contentScore} />
                    </span>
                </Button>
                <BooksDescription description={item.description} length={200} />
                <BookActions {...props} />
            </div>
        </Aux>
    );
};

export default withRouter(withStyle(BookComponent, 'book'));
