import React from 'react';
import { Comment, Avatar, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { CustomDate } from './../../../shared/utils/CustomDate';

interface Props {
    item: DataTypes.UserFeedRecordType;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    returnBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    bookmarkBook(bookId: number, onSuccess: () => void): void;
    likeReview(review: DataTypes.BookReviewRawRecordType): void;
    likeBook(book: DataTypes.BookRecordType): void;
}

const BookFeedItem = (props: Props) => {
    const { item } = props;
    const title = `${item.user.name} ${new CustomDate(item.date).toString()}`;

    const actions = [
        <Button
            onClick={() => {
                if (props.item.book !== undefined) {
                    props.bookmarkBook(props.item.book.id, () => {});
                }
            }}
        >
            bookmark
        </Button>,
    ];

    return (
        <Comment
            actions={actions}
            author={<a>{title}</a>}
            avatar={<Avatar src={item.user.picture} alt={item.user.name} />}
            content={
                <p>
                    {DataTypes.UserFeedTypeToString(item.type)}:{' '}
                    {item.bookDescription ? item.bookDescription.title : ''}
                </p>
            }
        />
    );
};

export default BookFeedItem;
