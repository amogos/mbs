import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../hooks/hooks';
import { Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

interface Props {
    userdata: DataTypes.UserRecordType;
    userBookmarks: DataTypes.BookRecordType[];
    history: any;
}

const Bookmark = (props: Props, book: DataTypes.BookRecordType) => {
    const onBookmarkClicked = () => {
        props.history.push(`/book?id=${book.id}`);
    };

    return (
        <div className="bookmark">
            <Button type="link">
                <Icon type="minus-circle" />
            </Button>
            <div>
                <img height={64} src={book.image} onClick={onBookmarkClicked} />
                {book.title}
            </div>
        </div>
    );
};

const ListBookmarksComponent = (props: Props) => {
    if (props.userBookmarks === undefined) return null;
    return (
        <div>
            <h2>Reading List</h2>
            {props.userBookmarks.map(book => Bookmark(props, book))}
        </div>
    );
};

export default withRouter(withStyle(ListBookmarksComponent, 'list_bookmarks_component'));
