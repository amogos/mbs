import React from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Avatar, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { CustomDate } from './../../../shared/utils/CustomDate';
import { withStyle } from './../hooks/hooks';

interface Props {
    item: DataTypes.UserFeedRecordType;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    returnBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    bookmarkBook(bookId: number, onSuccess: () => void): void;
    likeReview(review: DataTypes.BookReviewRawRecordType): void;
    likeBook(book: DataTypes.BookRecordType): void;
    history: any;
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

    const book = item.book as DataTypes.BookRecordType;

    return (
        <Comment
            author={<a>{title}</a>}
            avatar={<Avatar src={item.user.picture} alt={item.user.name} />}
            content={
                <p>
                    <div className="feed_item_root">
                        <img height="98" src={book.image} />
                        <div className="feed_item_right">
                            <Button onClick={() => props.history.push(`/book?id=${book.id}`)}>{book.title}</Button>
                            <p> by {book.author.map(author => author + ',')}</p>
                            {actions[0]}
                        </div>
                    </div>
                </p>
            }
        />
    );
};

export default withRouter(withStyle(BookFeedItem, 'book_feed_item'));
