import React from 'react';
import { Divider, Comment, Avatar, Tooltip } from 'antd';
import * as DataTypes from '../../../shared/types';
import Aux from './../aux_component';
import moment from 'moment';

interface Props {
    book: DataTypes.BookRecordType;
    reviews: DataTypes.BookReviewRecordType[];
}

const BookDisplayComponent = (props: Props) => {
    const { book, reviews } = props;

    return (
        <Aux>
            {book.title}
            <br />
            Author: {book.author.toString()} <br />
            Format: {book.format} <br />
            Language: {book.language.title}
            <br />
            PageCount: {book.length} <br />
            <p>{book.description}</p>
            <Divider />
            {reviews.map(entry => (
                <Comment
                    author={<a>Han Solo</a>}
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
                    }
                    content={<p>{entry.comment}</p>}
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                />
            ))}
        </Aux>
    );
};

export default BookDisplayComponent;
