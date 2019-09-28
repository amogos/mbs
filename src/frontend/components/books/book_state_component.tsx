import React, { useState } from 'react';
import * as DataTypes from '../../../shared/types';
import { Icon, Button, DatePicker } from 'antd';
import RentalSettingsComponent from './rental_settings_component';
import RatingComponent from '../notifications/rating_component';
import moment from 'moment';
import Aux from './../aux_component';

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
    reviewBook(bookId: number, comment: string, contentScore: number, stateScore: number): void;
    queueArray: DataTypes.QueueRecordType[];
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
    book: DataTypes.BookRecordType;
}

const BookStateDelete = (props: Props) => {
    return (
        <Button type="link" onClick={() => props.deleteBook(props.book.id)}>
            <IconText type="transaction" text="delete" />
        </Button>
    );
};

const BookStateAssigned = (props: Props) => {
    return <IconText type="hourglass" text="assigned" />;
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
                <IconText type="shopping-cart" text="request" />
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
    return <IconText type="carry-out" text="pending" />;
};

const BookStateReturn = (props: Props) => {
    const [showRatingModal, setShowRatingModal] = useState(false);

    const onRatePressed = (
        book: DataTypes.BookRecordType,
        contentRating: number,
        stateRating: number,
        comment: string,
    ) => {
        props.reviewBook(props.book.id, comment, contentRating, stateRating);
        props.book.holder = DataTypes.NullUser;
        props.returnBook(props.book.id);
    };

    const onRateCanceledPressed = () => {
        setShowRatingModal(false);
    };

    return (
        <Aux>
            <Button type="link" onClick={() => setShowRatingModal(true)}>
                <IconText type="import" text="return" />
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
