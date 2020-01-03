import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../hooks/hooks';
import { Button, Icon, Divider, Affix } from 'antd';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

interface Props {
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
        <Affix offsetTop={100}>
            <div>
                <h2>Reading List</h2>
                <Divider />
                <div className="bookmarks_scroll_area">{props.userBookmarks.map(book => Bookmark(props, book))}</div>
            </div>
        </Affix>
    );
};

export default withRouter(withStyle(ListBookmarksComponent, 'list_bookmarks_component'));
