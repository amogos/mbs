import React from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Divider, Button, Rate } from 'antd';
import BookStateComponent from './book_state';
import BookAvailabilityComponent from './book_availability';
import BooksDescription from './book_description';
import Aux, { withStyle } from '../../aux_component';
import * as DataTypes from '../../../../shared/types';

const SectionDivider = () => {
    return (
        <div className="section_divider_small">
            <Divider />
        </div>
    );
};

interface ReviewState {
    reviews: DataTypes.BookReviewRecordType[];
    visibility: boolean;
}

interface Props {
    userdata: DataTypes.UserRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];
    book: DataTypes.BookRecordType;
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
            <div className="book_details">
                <Button className="book_title" type="link" onClick={onBookTitleCliked}>
                    {item.title}
                </Button>
                <br />
                Author: {item.author.toString()} <br />
                Format: {item.format} <br />
                Language: {item.language.title}
                <br />
                PageCount: {item.length} <br />
                <BooksDescription description={item.description} length={200} />
                <Rate disabled defaultValue={item.contentScore} />
                <br />
                <BookAvailabilityComponent book={item} />
                <div>
                    <Avatar src={item.space.picture} size="large" />
                    Space: {item.space.description} <br />
                </div>
                <BookStateComponent {...props} book={item} />
            </div>
            <div className="book_icon_small">
                <img alt="logo" src={item.image} />
            </div>
            <br />
            <SectionDivider />
        </Aux>
    );
};

export default withRouter(withStyle(BookComponent, 'book'));
