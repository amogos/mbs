import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';
import { History } from 'history';
import { withStyle, requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import AboutComponent from './../about/about';
import { AppPages } from './../../../shared/types';

interface Props extends RouteComponentProps {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    history: History;
    userSpaces: DataTypes.SpaceType[];
    bookmarkBook(bookId: number, onSuccess: () => void): void;
    unbookmarkBook(bookId: number, onSuccess: () => void): void;
}

const BookContextActions = (props: Props) => {
    const { urlparams, userSpaces, userdata } = props;

    if (!urlparams.query.space) return null;
    const space: number = parseInt(urlparams.query.space);
    if (!urlparams.query.id) return null;
    const id: number = parseInt(urlparams.query.id);

    const mySpace = userSpaces.find(item => item.id === space);
    if (mySpace) return null;

    const userPendingToBookSpace = userdata.pendingSubscriptions.includes(space);
    const userSubscribedToBookSpace = userdata.subscriptions.includes(space);
    const showSubscribeButton = userPendingToBookSpace === false && userSubscribedToBookSpace === false;
    const bookIsBookmarked = userdata.bookmarks.includes(id as number);
    return (
        <div>
            <div className="context_actions">
                <div>
                    {bookIsBookmarked ? (
                        <Button onClick={() => props.unbookmarkBook(id as number, () => {})}>unbookmark</Button>
                    ) : (
                        <Button onClick={() => props.bookmarkBook(id as number, () => {})}>bookmark</Button>
                    )}
                </div>
                <div>
                    <p>Want to have acces to this shelf? </p>
                    {showSubscribeButton ? (
                        <Button onClick={() => props.history.push(`/${AppPages.Subscription}?space=${space}`)}>
                            subscribe
                        </Button>
                    ) : null}
                </div>
            </div>
            <AboutComponent />
        </div>
    );
};

const SpaceContextActions = (props: Props) => {
    const { urlparams, userSpaces, userdata } = props;

    if (!urlparams.query.space) return null;
    const space: number = parseInt(urlparams.query.space);

    const mySpace = userSpaces.find(item => item.id === space);
    if (mySpace) return null;

    const userPendingToBookSpace = userdata.pendingSubscriptions.includes(space);
    const userSubscribedToBookSpace = userdata.subscriptions.includes(space);
    const showSubscribeButton = userPendingToBookSpace === false && userSubscribedToBookSpace === false;
    return (
        <div>
            <div className="context_actions">
                <p>Want to have acces to this shelf? </p>
                <p>Ask for permission. </p>
                {showSubscribeButton ? (
                    <Button onClick={() => props.history.push(`/${AppPages.Subscription}?space=${space}`)}>
                        subscribe
                    </Button>
                ) : null}
            </div>
            <AboutComponent />
        </div>
    );
};

const LeftComponent = (props: Props) => {
    const { id } = props.urlparams;
    switch (id) {
        case AppPages.Book:
            return <BookContextActions {...props} />;
        case AppPages.Books:
            return <SpaceContextActions {...props} />;
    }
    return <AboutComponent />;
};

export default withRouter(requiresLogin(withStyle(LeftComponent, 'left_component')));
