import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import BookmarksList from './../../containers/list_bookmarks_container';
import UserFeed from './../../containers/user_feed_container';
import { AppPages } from './../../../shared/types';
import { History } from 'history';

interface Props extends RouteComponentProps {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    history: History;
}

class RightComponent extends React.Component<Props, {}> {
    refobject: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
    }

    public render() {
        const { id } = this.props.urlparams;

        switch (id) {
            case AppPages.Spaces:
            case undefined:
                return (
                    <div ref={this.refobject} className="right_component">
                        <UserFeed />
                        <BookmarksList nVisibleItems={4} />
                    </div>
                );
            default:
                return null;
        }
    }
}

export default requiresLogin(withRouter(RightComponent));
