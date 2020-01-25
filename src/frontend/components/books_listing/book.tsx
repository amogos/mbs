import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Rate } from 'antd';
import BooksDescription from '../book/book_description';
import { Aux, withStyle } from './../hooks/hooks';
import * as DataTypes from '../../../shared/types';
import BookActions from './../../containers/book_actions_container';
import { History } from 'history';
import { AppPages } from '../../../shared/types';

interface ReviewState {
    reviews: DataTypes.BookReviewRecordType[];
    visibility: boolean;
}

interface Props {
    userdata: DataTypes.UserRecordType;
    book: DataTypes.BookRecordType;
    bookChangingId: number;
    likeBook(book: DataTypes.BookRecordType): void;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
    bookmarkBook(bookId: number, onSuccess: () => void): void;
    history: History;
}

const BookComponent = (props: Props) => {
    const item = props.book;

    const onBookTitleCliked = () => {
        props.history.push(`/book?id=${item.id}`);
    };

    const isUserSubscribedToBookSpace = () => {
        const { userdata, book } = props;
        return userdata.subscriptions.includes(book.space.id);
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
                {isUserSubscribedToBookSpace() ? <BookActions book={item} /> : null}
            </div>
        </Aux>
    );
};

export default withRouter(withStyle(BookComponent, 'book'));
