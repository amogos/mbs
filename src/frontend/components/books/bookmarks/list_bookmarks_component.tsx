import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../hooks/hooks';
import { Button, Icon } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
    userBookmarks: DataTypes.BookRecordType[];
    unbookmarkBook(bookId: number, onSuccess: () => void): void;
}

const Bookmark = (props: Props, book: DataTypes.BookRecordType) => {
    return (
        <div className="bookmark">
            <Button type="link" onClick={() => props.unbookmarkBook(book.id, ()=>{})}>
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
            {props.userBookmarks.map(book => Bookmark(props, book))}
        </div>
    );
};

export default withStyle(ListBookmarksComponent, 'list_bookmarks_component');
