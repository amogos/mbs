import React, { useState } from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar, Divider } from 'antd';
import BookStateComponent from './book_state';
import BookAvailabilityComponent from './book_availability';
import BookReviewsComponent from './book_reviews';
import BookRatingComponent from './book_rating';
import BooksDescription from './book_description';
import Aux, { withStyle } from './../aux_component';

interface Props {
    action: string;
    userdata: DataTypes.UserRecordType;
    bookChangingId: number;
    booksArray: DataTypes.BookRecordType[];
    queueArray: DataTypes.QueueRecordType[];
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    returnBook(bookId: number): void;
    reviewBook(bookId: number, comment: string, contentScore: number, stateScore: number): void;
    getReviewsForBook(
        bookId: number,
        callback: (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => void,
    ): void;
    urlparams: DataTypes.UrlParms;
}

interface ReviewState {
    reviews: DataTypes.BookReviewRecordType[];
    visibility: boolean;
}

const SectionDivider = () => {
    return (
        <div className="section_divider_small">
            <Divider />
        </div>
    );
};

const ListBooksComponent = (props: Props) => {
    const [state, setState] = useState({});

    if (!props.booksArray) {
        return null;
    }

    const getReviewsFromState = (bookId: number): DataTypes.BookReviewRecordType[] => {
        const targetKey = `k${bookId}`;
        for (const [key, value] of Object.entries(state)) {
            if (key === targetKey) {
                return (value as ReviewState).reviews;
            }
        }
        return [];
    };

    const onReviewsReceived = (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => {
        const key = `k${bookId}`;
        const newstate = { ...state, [key]: { reviews: reviews, visibility: true } };
        setState(newstate);
    };

    const onGetReviewsClicked = (bookId: number) => {
        const key = `k${bookId}`;
        if (key in state) {
            const reviews = getReviewsFromState(bookId);
            const newstate = { ...state, [key]: { reviews: reviews, visibility: true } };
            setState(newstate);
            return;
        }
        props.getReviewsForBook(bookId, onReviewsReceived);
    };

    const getVisibilityFromState = (bookId: number): boolean => {
        const targetKey = `k${bookId}`;
        for (const [key, value] of Object.entries(state)) {
            if (key === targetKey) {
                return (value as ReviewState).visibility;
            }
        }
        return false;
    };

    const closeComments = (bookId: number) => {
        const key = `k${bookId}`;
        const reviews = getReviewsFromState(bookId);
        const newstate = { ...state, [key]: { reviews: reviews, visibility: false } };
        setState(newstate);
    };

    const BookComponent = (item: DataTypes.BookRecordType) => {
        return (
            <Aux key={`k${item.id}`}>
                <div className="book_details">
                    {item.title}
                    <i> ({item.language.title})</i> <br />
                    Author: {item.author.toString()} <br />
                    Format: {item.format} <br />
                    <BooksDescription description={item.description} length={200} />
                    <BookRatingComponent
                        contentRating={item.contentScore}
                        numReviews={item.numReviews}
                        onClick={() => onGetReviewsClicked(item.id)}
                    />
                    <br />
                    <BookAvailabilityComponent book={item} />
                    <BookReviewsComponent
                        bookId={item.id}
                        reviews={getReviewsFromState(item.id)}
                        visible={getVisibilityFromState(item.id)}
                        onClick={() => closeComments(item.id)}
                    />
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

    return props.booksArray.map(item => BookComponent(item));
};

export default withStyle(ListBooksComponent, 'list_book_component');
