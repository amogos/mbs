import React from 'react';
import * as DataTypes from './../types';
import { List, Avatar, Icon, Badge, Tag } from 'antd';
import BookStateComponent from './book_state_component';
import Moment from 'react-moment';

interface Props {
    action: string;
    booksArray: DataTypes.BookRecordType[];
    userdata: DataTypes.UserRecordType;
    bookChangingId: number;
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

interface BookInfo {
    book: DataTypes.BookValueType;
}

const AvailabilityDate = (param: BookInfo) => {
    if (param.book.return && Date.now() < param.book.return)
        return (
            <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
                <Tag color="red">
                    <Moment format="YYYY/MM/DD" date={new Date(param.book.return)} />
                </Tag>
            </Badge>
        );
    return null;
};

const ListBooksComponent = (props: Props) => {
    return (
        <div>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {},
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
                            <BookStateComponent {...props} book={item} />,
                        ]}
                        extra={<img width={64} alt="logo" src={item.value.image} />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.value.owner.value.picture} />}
                            title={
                                <a href={item.value.image}>
                                    {item.value.title}
                                    <i> ({item.value.language.language})</i>
                                    <AvailabilityDate book={item.value} />
                                </a>
                            }
                            description={
                                <div>
                                    Author: {item.value.author} <br />
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ListBooksComponent;
