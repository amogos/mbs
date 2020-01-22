import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Button, Icon } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { requiresCondition } from '../hooks/hooks';
import { AppPages } from '../../../shared/types';

interface Props extends RouteComponentProps {
    userdata: DataTypes.UserRecordType;
    userBookmarks: DataTypes.BookRecordType[];
    history: History;
    nVisibleItems: number;
    unbookmarkBook(bookId: number, onSuccess: () => void): void;
}

const Bookmark = (props: Props, book: DataTypes.BookRecordType) => {
    return (
        <div className="bookmark">
            <Button type="link" onClick={() => props.unbookmarkBook(book.id, () => {})}>
                <Icon type="minus-circle" />
            </Button>
            <div onClick={() => props.history.push(`/${AppPages.Book}?id=${book.id}`)}>
                <img height={64} src={book.image} alt="" />
                {book.title}
            </div>
        </div>
    );
};

const ListBookmarksComponent = (props: Props) => {
    const reverseBookmarksArray = props.userBookmarks.splice(0).reverse();

    const { nVisibleItems } = props;

    return (
        <div className="list_bookmarks_component">
            <div className="banner">
                <h2>Bookmarks</h2>
            </div>
            {React.Children.toArray(reverseBookmarksArray.slice(0, nVisibleItems).map(book => Bookmark(props, book)))}
        </div>
    );
};

ListBookmarksComponent.defaultProps = {
    nVisibleItems: 4,
};

const validateProps = (props: Props) => {
    return props.userBookmarks && props.userBookmarks.length > 0;
};

export default withRouter(requiresCondition(ListBookmarksComponent, (props: Props) => validateProps(props)));
