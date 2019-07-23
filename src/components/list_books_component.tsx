import React from 'react';
import * as DataTypes from './../types';
import { List, Avatar, Icon, Tabs } from 'antd';
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
    gotoListBooks(filters: string[]): void;
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

const FilteringTabs = (props: Props) => {
    const { TabPane } = Tabs;

    const onTabSelectionChanged = (key: string) => {
        switch (key) {
            case '1':
                {
                    props.gotoListBooks(['owner=' + props.userdata.id]);
                }
                break;
            case '2':
                {
                    props.gotoListBooks(['holder=' + props.userdata.id]);
                }
                break;
            case '3':
                {
                    props.gotoListBooks([]);
                }
                break;
            default:
                {
                    props.gotoListBooks([]);
                }
                break;
        }
    };

    return (
        <Tabs defaultActiveKey="2" onChange={(key: string) => onTabSelectionChanged(key)}>
            <TabPane
                tab={
                    <span>
                        <Icon type="apple" />
                        Owned Books
                    </span>
                }
                key="1"
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        Rented Books
                    </span>
                }
                key="2"
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        All Books Available
                    </span>
                }
                key="3"
            />
        </Tabs>
    );
};

const ListBooksComponent = (props: Props) => {
    return (
        <div>
            <FilteringTabs {...props} />
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
        </div>
    );
};

export default ListBooksComponent;
