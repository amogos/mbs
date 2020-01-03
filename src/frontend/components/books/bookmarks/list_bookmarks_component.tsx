import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { Button, Icon, Affix } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

interface Props extends RouteComponentProps {
    userdata: DataTypes.UserRecordType;
    userBookmarks: DataTypes.BookRecordType[];
    history: History;
    unbookmarkBook(bookId: number, onSuccess: () => void): void;
}

const Bookmark = (props: Props, book: DataTypes.BookRecordType) => {
    const onBookmarkClicked = () => {
        props.history.push(`/book?id=${book.id}`);
    };

    return (
        <div className="bookmark">
            <Button type="link" onClick={() => props.unbookmarkBook(book.id, () => {})}>
                <Icon type="minus-circle" />
            </Button>
            <div onClick={onBookmarkClicked}>
                <img height={64} src={book.image} />
                {book.title}
            </div>
        </div>
    );
};

const ListBookmarksComponent = (props: Props) => {
    if (props.userBookmarks === undefined) return null;
    return (
        <Affix offsetTop={150}>
            <div className="list_bookmarks_component">
                <div className="list_bookmarks_banner">
                    <h2>Reading List</h2>
                </div>
                {props.userBookmarks.map(book => Bookmark(props, book))}
            </div>
        </Affix>
    );
};

export default withRouter(ListBookmarksComponent);
