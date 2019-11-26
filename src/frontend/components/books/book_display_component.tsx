import React from 'react';
import { Divider, Comment, Avatar, Tooltip } from 'antd';
import * as DataTypes from '../../../shared/types';
import Aux from './../aux_component';
import moment from 'moment';
import { withStyle } from './../aux_component';

interface Props {
    displayedBook: DataTypes.BookRecordType;
    displayedBookReviews: DataTypes.BookReviewRecordType[];
}

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
            {displayedBookReviews.map(entry => (
                <Comment
                    author={<a>{entry.user.name}</a>}
                    avatar={<Avatar src={entry.user.picture} alt={entry.user.name} />}
                    content={<p>{entry.comment}</p>}
                    datetime={<span>{entry.date}</span>}
                />
            ))}
        </Aux>
    );
};

export default withStyle(BookDisplayComponent, 'book_display_component');
