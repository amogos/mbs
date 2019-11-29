import React, { useState } from 'react';
import { Divider, Comment, Avatar, Rate, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import Aux from './../aux_component';
import { withStyle } from './../aux_component';

interface Props {
    displayedBook: DataTypes.BookRecordType;
    displayedBookReviews: DataTypes.BookReviewRecordType[];
    likeReview(review: DataTypes.BookReviewRawRecordType): void;
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
                    <Rate disabled defaultValue={entry.score} />
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
    const { displayedBook, displayedBookReviews } = props;

    if (!displayedBook || displayedBook.id === 0) return null;
    if (!displayedBookReviews) return null;

    return (
        <Aux>
            <div className="book_icon_small">
                <img alt="logo" src={displayedBook.image} />
            </div>
            {displayedBook.title}
            <br />
            Author: {displayedBook.author.toString()} <br />
            Format: {displayedBook.format} <br />
            Language: {displayedBook.language.title}
            <br />
            PageCount: {displayedBook.length} <br />
            <p>{displayedBook.description}</p>
            <Divider />
            {displayedBookReviews.map(entry => Review(props, entry))}
        </Aux>
    );
};

export default withStyle(BookDisplayComponent, 'book_display_component');
