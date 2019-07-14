import React from 'react';
import * as DataTypes from './../types';
import { List, Avatar, Icon, Button } from 'antd';

interface Props {
    action: string;
    userdata: DataTypes.UserRecordType;
    changingkey: number;
    booksArray: DataTypes.BookRecordType[];
    deleteBook(bookId: number): void;
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
}

const BookActionsComponent = (param: BookAction) => {
    if (param.book.value.owner.id === param.props.userdata.id) {
        return (
            <Button onClick={() => param.props.deleteBook(param.book.id)}>
                <IconText type="transaction" text="delete" />
            </Button>
        );
    }
    return null;
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
                        <BookActionsComponent book={item} props={props} />,
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
