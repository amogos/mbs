import React, { useState } from 'react';
import * as DataTypes from '../../types';
import { List, Avatar } from 'antd';
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
                renderItem={item => (
                    <List.Item
                        key={`k${item.id}`}
                        actions={[
                            <BookRatingComponent
                                contentRating={item.contentScore}
                                numReviews={item.numReviews}
                                onClick={() => onGetReviewsClicked(item.id)}
                            />,
                            <BookStateComponent {...props} book={item} />,
                        ]}
                        extra={<img width={64} alt="logo" src={item.image} />}
                    >
                        {/* <List.Item.Meta
                            avatar={
                                <div>
                                    <Avatar src={item.space.picture} size="large" shape="square" />
                                </div>
                            }
                            title={
                                <a href={item.image}>
                                    {item.title}
                                    <i> ({item.language.language})</i>
                                    <BookAvailabilityComponent book={item} />
                                </a>
                            }
                            description={
                                <div>
                                    Author: {item.author} <br />
                                    Space: {item.space.description} <br />
                                    Format: {item.format}
                                </div>
                            }
                        /> */}
                        <BookReviewsComponent
                            bookId={item.id}
                            reviews={getReviewsFromState(item.id)}
                            visible={getVisibilityFromState(item.id)}
                            onClick={() => closeComments(item.id)}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ListBooksComponent;
