import React from 'react';
import * as DataTypes from './../types';
import { Icon, Button } from 'antd';

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
    action: string;
    userdata: DataTypes.UserRecordType;
    bookChangingId: number;
    queueArray: DataTypes.QueueRecordType[];
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
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
    return (
        <Button
            type="link"
            onClick={() => {
                param.askBook(param.book.id, param.book.value.owner.id);
            }}
        >
            <IconText type="shopping-cart" text="request" />
        </Button>
    );
};

const BookStateCarryOut = (props: Props) => {
    return <IconText type="carry-out" text="pending" />;
};

const BookStateReturn = (props: Props) => {
    return (
        <Button
            type="link"
            onClick={() => {
                props.returnBook(props.book.id);
            }}
        >
            <IconText type="import" text="return" />
        </Button>
    );
};

const BookStateComponent = (props: Props) => {
    const bookIsInMyQueue: boolean = props.queueArray.findIndex(item => item.value.bookId === props.book.id) >= 0;
    const bookIsMine: boolean = props.userdata.id === props.book.value.owner.id;
    const bookHasHolder: boolean = props.book.value.holder.id > 0;
    const bookIsAssignedToMe: boolean = props.book.value.holder.id === props.userdata.id;

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
