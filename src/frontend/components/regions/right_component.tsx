import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import RentedBooksList from './../../containers/list_rented_books_container';
import BookmarksList from './../../containers/list_bookmarks_container';
import UserFeedSmall from '../../containers/user_feed_container_small';
import { AppPages } from './../../../shared/types';

interface Props extends RouteComponentProps {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    history: History;
    getBookmarks(userdata: DataTypes.UserRecordType, callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
    getRentedBooks(
        userdata: DataTypes.UserRecordType,
        callbacks: ((books: DataTypes.BookRecordType[]) => void)[],
    ): void;
}

class RightComponent extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.updateContent();
    }

    public componentDidUpdate(prevProps: Props) {
        this.updateContent();
    }

    public updateContent() {
        const { id } = this.props.urlparams;

        switch (id) {
            case AppPages.Spaces:
            case undefined:
                this.props.getBookmarks(this.props.userdata, []);
                this.props.getRentedBooks(this.props.userdata, []);
                break;
            default:
                break;
        }
    }

    public render() {
        const { id } = this.props.urlparams;

        switch (id) {
            case AppPages.Spaces:
            case undefined:
                return (
                    <div className="right_component">
                        <UserFeedSmall />
                        <BookmarksList />
                        <RentedBooksList />
                    </div>
                );
            default:
                return null;
        }
    }
}

export default requiresLogin(withRouter(RightComponent));
