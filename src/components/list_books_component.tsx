import React, { useState } from 'react';
import * as DataTypes from './../types';
import { List, Avatar, Icon, Badge, Tag, Rate, Button } from 'antd';
import BookStateComponent from './book_state_component';
import Moment from 'react-moment';
import * as StringConstant from './../constants/string_constant';
import BookReviewsComponent from './book_reviews_component';

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

const AvailabilityDate = (param: { book: DataTypes.BookValueType }) => {
    if (param.book.return && Date.now() < param.book.return)
        return (
            <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
                <Tag color="red">
                    <Moment format="YYYY/MM/DD" date={new Date(param.book.return)} />
                </Tag>
            </Badge>
        );
    return null;
};

const BookRatingButton = (param: {
    contentRating: number | undefined;
    numReviews: number | undefined;
    onClick: () => void;
}) => {
    return (
        <Button type="link" onClick={param.onClick}>
            <Rate allowHalf disabled defaultValue={param.contentRating} />
            {param.numReviews} {StringConstant.default.MYBOOKSHELVE_CUSTOMER_REVIEWS}
        </Button>
    );
};

const ListBooksComponent = (props: Props) => {
    const [state, setState] = useState({});

    interface ReviewState {
        reviews: DataTypes.BookReviewRecordType[];
        visibility: boolean;
    }

    const onReviewsReceived = (bookId: number, reviews: DataTypes.BookReviewRecordType[]) => {
        const key = `k${bookId}`;
        const newstate = { ...state, [key]: { reviews: reviews, visibility: true } };
        setState(newstate);
    };

    const getReviewsFromState = (bookId: number): DataTypes.BookReviewRecordType[] => {
        const targetKey = `k${bookId}`;
        for (const [key, value] of Object.entries(state)) {
            if (key === targetKey) {
                return (value as ReviewState).reviews;
            }
        }
        return [];
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
                            <BookRatingButton
                                contentRating={item.contentScore}
                                numReviews={item.numReviews}
                                onClick={() => onGetReviewsClicked(item.id)}
                            />,
                            <BookStateComponent {...props} book={item} />,
                        ]}
                        extra={<img width={64} alt="logo" src={item.image} />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.space.picture} />}
                            title={
                                <a href={item.image}>
                                    {item.title}
                                    <i> ({item.language.language})</i>
                                    <AvailabilityDate book={item} />
                                </a>
                            }
                            description={
                                <div>
                                    Author: {item.author} <br />
                                </div>
                            }
                        />
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
