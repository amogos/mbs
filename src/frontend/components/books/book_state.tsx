import React, { useState } from 'react';
import * as DataTypes from '../../../shared/types';
import { Icon, Button, DatePicker } from 'antd';
import RentalSettingsComponent from './rental_settings';
import RatingComponent from '../notifications/rating';
import moment from 'moment';
import Aux from '../aux_component';
import * as Strings from '../../../shared/constants/string_constant';

const { BookStateStrings } = Strings.default;

interface Icon {
    type: string;
    text: string;
}

const IconText = (param: Icon) => (
    <span>
        <Icon type={param.type} style={{ marginRight: 8 }} />
        {param.text}
    </span>
);

interface Props {
    userdata: DataTypes.UserRecordType;
    book: DataTypes.BookRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];

    reviewBook(review: DataTypes.BookReviewValueType): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
}

const BookStateDelete = (props: Props) => {
    return (
        <Button type="link" onClick={() => props.deleteBook(props.book.id)}>
            <IconText type="transaction" text={BookStateStrings.DELETE_BOOK} />
        </Button>
    );
};

const BookStateAssigned = (props: Props) => {
    return <IconText type="hourglass" text={BookStateStrings.ASSIGNED_BOOK} />;
};

const BookStateAddToCart = (param: Props) => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <Button
                type="link"
                onClick={() => {
                    setVisible(true);
                }}
            >
                <IconText type="shopping-cart" text={BookStateStrings.REQUEST_BOOK} />
            </Button>
            <RentalSettingsComponent
                visible={visible}
                onDurationChanged={(duration: number) => param.askBook(param.book.id, param.book.owner.id, duration)}
                onClosed={() => setVisible(false)}
            />
        </div>
    );
};

const BookStateCarryOut = (props: Props) => {
    return <IconText type="carry-out" text={BookStateStrings.PENDING_BOOK} />;
};

const BookStateReturn = (props: Props) => {
    const [showRatingModal, setShowRatingModal] = useState(false);

    const onRatePressed = (
        book: DataTypes.BookRecordType,
        contentRating: number,
        stateRating: number,
        comment: string,
    ) => {
        const review: DataTypes.BookReviewValueType = DataTypes.NullBookReviewValueType;
        review.comment = comment;
        review.isbn10 = book.isbn10;
        review.isbn13 = book.isbn13;
        review.score = contentRating;
        props.reviewBook(review);

        props.book.holder = DataTypes.NullUserRecordType;
        props.returnBook(props.book.id);
    };

    const onRateCanceledPressed = () => {
        setShowRatingModal(false);
    };

    return (
        <Aux>
            <Button type="link" onClick={() => setShowRatingModal(true)}>
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

const BookStateComponent = (props: Props) => {
    const bookIsInMyQueue: boolean = props.queueArray.findIndex(item => item.bookId === props.book.id) >= 0;
    const bookIsMine: boolean = props.userdata.id === props.book.owner.id;
    const bookHasHolder: boolean = props.book.holder.id > 0;
    const bookIsAssignedToMe: boolean = props.book.holder.id === props.userdata.id;

    if (bookIsInMyQueue) {
        return <BookStateCarryOut {...props} />;
    } else if (bookIsAssignedToMe) {
        return <BookStateReturn {...props} />;
    } else if (bookIsMine) {
        if (bookHasHolder) return <BookStateAssigned {...props} />;
        else return <BookStateDelete {...props} />;
    } else {
        return <BookStateAddToCart {...props} />;
    }
};

export default BookStateComponent;
