import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Rate } from 'antd';
import BookStateComponent from './book_state';
import BookAvailabilityComponent from './book_availability';
import BooksDescription from './book_description';
import { Aux, withStyle } from '../../hooks/hooks';
import * as DataTypes from '../../../../shared/types';
import LikeBook from './like_book';

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
    displayBook(bookId: number): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
    history: any;
}

const BookComponent = (props: Props) => {
    const item = props.book;

    const onBookTitleCliked = () => {
        props.displayBook(props.book.id);
        props.history.push(`/book`);
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

                <BookAvailabilityComponent book={item} />
                <div className="book_actions">
                    <div className="book_actions_left">
                        <LikeBook {...props} />
                    </div>
                    <div className="book_actions_right">
                        <BookStateComponent {...props} />
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default withRouter(withStyle(BookComponent, 'book'));
