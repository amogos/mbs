import React, { useState } from 'react';
import * as DataTypes from './../types';
import { List, Avatar, Icon, Button } from 'antd';

interface Props {
    action: string;
    userdata: DataTypes.UserRecordType;
    bookChangingId: number;
    booksArray: DataTypes.BookRecordType[];
    queueArray: DataTypes.QueueRecordType[];
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number): void;
    returnBook(bookId: number): void;
}

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

interface BookAction {
    props: Props;
    book: DataTypes.BookRecordType;
    onClick?: () => void;
}

const BookStateDelete = (param: BookAction) => {
    return (
        <Button type="link" onClick={() => param.props.deleteBook(param.book.id)}>
            <IconText type="transaction" text="delete" />
        </Button>
    );
};

const BookStateAssigned = (param: BookAction) => {
    return <IconText type="hourglass" text="assigned" />;
};

const BookStateAddToCart = (param: BookAction) => {
    return (
        <Button
            type="link"
            onClick={() => {
                if (param.onClick) param.onClick();
                param.props.askBook(param.book.id, param.book.value.owner.id);
            }}
        >
            <IconText type="shopping-cart" text="request" />
        </Button>
    );
};

const BookStateCarryOut = (param: BookAction) => {
    return <IconText type="carry-out" text="pending" />;
};

const BookStateReturn = (param: BookAction) => {
    return (
        <Button
            type="link"
            onClick={() => {
                param.props.returnBook(param.book.id);
            }}
        >
            <IconText type="import" text="return" />
        </Button>
    );
};

const BookStateComponent = (props: BookAction) => {
    const bookIsInMyQueue: boolean = props.props.queueArray.findIndex(item => item.value.bookId === props.book.id) >= 0;
    const [requested, setRequested] = useState(bookIsInMyQueue);
    const bookIsMine: boolean = props.props.userdata.id === props.book.value.owner.id;
    const bookHasHolder: boolean = props.book.value.holder.id > 0;
    const bookIsAssignedToMe: boolean = props.book.value.holder.id === props.props.userdata.id;

    if (requested) {
        return <BookStateCarryOut {...props} />;
    } else if (bookIsAssignedToMe) {
        return <BookStateReturn {...props} />;
    } else if (bookIsMine) {
        if (bookHasHolder) return <BookStateAssigned {...props} />;
        else return <BookStateDelete {...props} />;
    } else {
        return <BookStateAddToCart {...props} onClick={() => setRequested(true)} />;
    }
};

const ListBooksComponent = (props: Props) => {
    return (
        <List
            itemLayout="vertical"
            size="small"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 6,
            }}
            dataSource={props.booksArray}
            renderItem={item => (
                <List.Item
                    key={item.value.title}
                    actions={[
                        <IconText type="star-o" text="156" />,
                        <IconText type="like-o" text="156" />,
                        <IconText type="message" text="2" />,
                        <BookStateComponent book={item} props={props} />,
                    ]}
                    extra={<img width={64} alt="logo" src={item.value.image} />}
                >
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={
                            <a href={item.value.image}>
                                {item.value.title}
                                <i> ({item.value.language.language})</i>
                            </a>
                        }
                        description={<div>Author: {item.value.author}</div>}
                    />
                </List.Item>
            )}
        />
    );
};

export default ListBooksComponent;
