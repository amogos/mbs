import React, { useState } from 'react';
import './books.css';
import * as DataTypes from '../../types';
import { List, Avatar, Divider } from 'antd';
import BookStateComponent from './book_state_component';
import BookAvailabilityComponent from './book_availability_component';
import BookReviewsComponent from './book_reviews_component';
import BookRatingComponent from './book_rating_component';

interface Props {
    action: string;
    booksArray: DataTypes.BookRecordType[];
    userdata: DataTypes.UserRecordType;
    bookChangingId: number;
    queueArray: DataTypes.QueueRecordType[];
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    returnBook(bookId: number): void;
    reviewBook(bookId: number, comment: string, contentScore: number, stateScore: number): void;
    getReviewsForBook(
        bookId: number,
        callback: (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => void,
    ): void;
}

const ListBooksComponent = (props: Props) => {
    const [state, setState] = useState({});

    interface ReviewState {
        reviews: DataTypes.BookReviewRecordType[];
        visibility: boolean;
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

    const SectionDivider = () => {
        return (
            <div className="section_divider_small">
                <Divider />
            </div>
        );
    };

    const BookComponent = (item: DataTypes.BookRecordType) => {
        return (
            <List.Item key={`k${item.id}`}>
                <div className="book_icon_small">
                    <img width={200} alt="logo" src={item.image} />
                </div>
                <div className="book_details">
                    {item.title}
                    <i> ({item.language.language})</i> <br />
                    Author: {item.author} <br />
                    Format: {item.format} <br />
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
                    <SectionDivider />
                    <div>
                        <Avatar src={item.space.picture} size="large" />
                        Space: {item.space.description} <br />
                    </div>
                    <SectionDivider />
                    <BookStateComponent {...props} book={item} />
                </div>
            </List.Item>
        );
    };

    return (
        <div>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {},
                    pageSize: 6,
                }}
                dataSource={props.booksArray}
                renderItem={item => BookComponent(item)}
            />
        </div>
    );
};

export default ListBooksComponent;
