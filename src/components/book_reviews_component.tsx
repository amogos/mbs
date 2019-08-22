import React from 'react';
import * as DataTypes from './../types';

interface Props {
    bookId: number;
    reviews: DataTypes.BookReviewRecordType[];
}

const BookReviewsComponent = (props: Props) => {
    return <div>{props.reviews.map(entry => entry.comment)}</div>;
};

export default BookReviewsComponent;
