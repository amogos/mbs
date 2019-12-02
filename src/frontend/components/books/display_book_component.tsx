import React, { useState } from 'react';
import { Divider, Comment, Avatar, Rate, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from '../hooks/hooks';
import BookDescription from './book/book_description';
import BookActions from './book/book_actions';

interface Props {
    userdata: DataTypes.UserRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];
    book: DataTypes.BookRecordType;
    bookReviews: DataTypes.BookReviewRecordType[];
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
                <a>
                    {entry.user.name} rated it
                    <Rate className="review_rating" disabled defaultValue={entry.score} />
                </a>
            }
            avatar={<Avatar src={entry.user.picture} alt={entry.user.name} />}
            content={
                <div>
                    <p>{entry.comment}</p>
                    {likes} likes <Button onClick={likeReview}>Like</Button>
                </div>
            }
            datetime={<span>{entry.date}</span>}
        />
    );
};

const BookDisplayComponent = (props: Props) => {
    const { book, bookReviews } = props;

    if (book === undefined || book.id === undefined) return null;
    if (bookReviews === undefined || bookReviews.length === 0) return null;

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
            <BookActions {...props} />
            <Divider />
            {bookReviews.map(entry => Review(props, entry))}
        </Aux>
    );
};

export default withStyle(BookDisplayComponent, 'book_display_component');
