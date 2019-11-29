import React, { useState } from 'react';
import * as DataTypes from '../../../../../shared/types';
import { Button, DatePicker } from 'antd';
import RatingComponent from '../../../notifications/rating';
import moment from 'moment';
import { Aux } from '../../../hooks/hooks';
import * as Strings from '../../../../../shared/constants/string_constant';
import IconText from '../../icon_text';

interface Props {
    userdata: DataTypes.UserRecordType;
    book: DataTypes.BookRecordType;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    returnBook(bookId: number): void;
}

const BookStateReturn = (props: Props) => {
    const [showRatingModal, setShowRatingModal] = useState(false);
    const { BookStateStrings } = Strings.default;

    const onRatePressed = (
        book: DataTypes.BookRecordType,
        contentRating: number,
        stateRating: number,
        comment: string,
    ) => {
        const review: DataTypes.BookReviewRawValueType = DataTypes.NullBookReviewRawValueType();
        review.comment = comment;
        review.isbn10 = book.isbn10;
        review.isbn13 = book.isbn13;
        review.score = contentRating;
        review.user = props.userdata.id;
        review.date = JSON.stringify(new Date());
        props.reviewBook(review);

        props.book.holder = DataTypes.NullUserRecordType();
        props.returnBook(props.book.id);
    };

    const onRateCanceledPressed = () => {
        setShowRatingModal(false);
    };

    return (
        <Aux>
            <Button onClick={() => setShowRatingModal(true)}>
                <IconText type="import" text={BookStateStrings.RETURN_BOOK} />
            </Button>
            <DatePicker defaultValue={moment(props.book.return)} disabled />
            <RatingComponent
                visible={showRatingModal}
                userdata={props.userdata}
                onOk={(contentRating: number, stateRating: number, comment: string) =>
                    onRatePressed(props.book, contentRating, stateRating, comment)
                }
                onClosed={onRateCanceledPressed}
            />
        </Aux>
    );
};

export default BookStateReturn;
