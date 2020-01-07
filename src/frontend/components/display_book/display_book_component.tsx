import React, { useState } from 'react';
import { Divider, Comment, Avatar, Rate, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from '../hooks/hooks';
import BookDescription from './../book/book_description';
import BookActions from '../../containers/book_actions_container';
import { CustomDate } from '../../../shared/utils/CustomDate';

interface Props {
    userdata: DataTypes.UserRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];
    book: DataTypes.BookRecordType;
    bookReviews: DataTypes.BookReviewRecordType[];
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    returnBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    bookmarkBook(bookId: number, onSuccess: () => void): void;
    likeReview(review: DataTypes.BookReviewRawRecordType): void;
    likeBook(book: DataTypes.BookRecordType): void;
}

const Review = (props: Props, entry: DataTypes.BookReviewRecordType) => {
    const [likes, setLikes] = useState(entry.likes);
    const rawReview = DataTypes.ToBookReviewRawRecordType(entry);

    const likeReview = () => {
        const newLikesCount = likes + 1;
        rawReview.likes = newLikesCount;
        entry.likes = newLikesCount;
        setLikes(newLikesCount);
        props.likeReview(rawReview);
    };

    return (
        <Comment
            author={
                <Button type="link">
                    {entry.user.name} rated it
                    <Rate className="review_rating" disabled defaultValue={entry.score} />
                </Button>
            }
            avatar={<Avatar src={entry.user.picture} alt={entry.user.name} />}
            content={
                <div>
                    <p>{entry.comment}</p>
                    {likes} likes <Button onClick={likeReview}>Like</Button>
                </div>
            }
            datetime={<span>{new CustomDate(entry.date).toString()}</span>}
        />
    );
};

const BookDisplayComponent = (props: Props) => {
    const { book, bookReviews } = props;

    if (book === undefined || book.id === undefined) return null;
    if (bookReviews === undefined) return null;

    return (
        <Aux>
            <div className="book_icon_small">
                <img alt="logo" src={book.image} />
            </div>
            {book.title}
            <br />
            Author: {book.author.toString()} <br />
            Format: {book.format} <br />
            Language: {book.language.title}
            <br />
            PageCount: {book.length} <br />
            <BookDescription description={book.description} length={200} />
            <BookActions book={book} />
            <Divider />
            {React.Children.toArray(bookReviews.map(entry => Review(props, entry)))}
        </Aux>
    );
};

export default withStyle(BookDisplayComponent, 'book_display_component');
