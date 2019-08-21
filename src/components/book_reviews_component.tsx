import React from 'react';
import * as DataTypes from './../types';

interface Props {
    reviews: DataTypes.BookReviewRecordType[];
}

const BookReviewsComponent = (props: Props) => {
    return props.reviews.map(entry => entry.comment);
};

export default BookReviewsComponent;
