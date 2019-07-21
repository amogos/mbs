import React from 'react';
import * as DataTypes from './../types';
import { List, Avatar, Icon } from 'antd';
import BookStateComponent from './book_state_component';

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

const ListBooksComponent = (props: Props) => {
    return (
        <List
            itemLayout="vertical"
            size="small"
            pagination={{
                onChange: page => {
                    // on page changed
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
                        <BookStateComponent {...props} book={item} />,
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
