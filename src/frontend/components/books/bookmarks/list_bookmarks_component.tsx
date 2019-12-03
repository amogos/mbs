import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../hooks/hooks';
import { Button, Icon } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
    userBookmarks: DataTypes.BookRecordType[];
}

const Bookmark = (book: DataTypes.BookRecordType) => {
    return (
        <div className="bookmark">
            <Button type="link">
                <Icon type="minus-circle" />
            </Button>
            <img height={64} src={book.image} />
            {book.title}
        </div>
    );
};

const ListBookmarksComponent = (props: Props) => {
    if (props.userBookmarks === undefined) return null;
    return (
        <div>
            <h2>Reading List</h2>
            {props.userBookmarks.map(book => Bookmark(book))}
        </div>
    );
};

export default withStyle(ListBookmarksComponent, 'list_bookmarks_component');
