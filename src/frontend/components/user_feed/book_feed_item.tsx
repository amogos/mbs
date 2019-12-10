import React from 'react';
import { Comment, Avatar, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { CustomDate } from './../../../shared/utils/CustomDate';
import { Aux, withStyle } from './../hooks/hooks';

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
    const title = `${item.user.name}  ${DataTypes.UserFeedTypeToString(item.type)} ${new CustomDate(
        item.date,
    ).toString()} `;

    const actions = [
        <Button
            className="feed_button"
            onClick={() => {
                if (props.item.book !== undefined) {
                    props.bookmarkBook(props.item.book.id, () => {});
                }
            }}
        >
            bookmark
        </Button>,
    ];

    const bookDescription = item.bookDescription as DataTypes.BookDescriptionRecordType;

    return (
        <Comment
            author={<a>{title}</a>}
            avatar={<Avatar src={item.user.picture} alt={item.user.name} />}
            content={
                <p>
                    <div className="feed_item_root">
                        <img height="64" src={bookDescription.image} />
                        <div className="feed_item_right">
                            {bookDescription.title}
                            <p>by {bookDescription.author.map(author => author + ',')}</p>
                            {actions[0]}
                        </div>
                    </div>
                </p>
            }
        />
    );
};

export default withStyle(BookFeedItem, 'book_feed_item');
