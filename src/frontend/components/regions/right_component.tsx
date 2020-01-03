import React from 'react';
import { requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import BookmarksList from './../../containers/list_bookmarks_container';
import UserFeed from './../../containers/user_feed_container';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
}

class RightComponent extends React.Component<Props, {}> {
    refobject: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
    }

    private updateStyle() {
        const element = this.refobject.current;

        if (!element) return;
    }

    public componentDidMount() {
        window.addEventListener('scroll', () => this.updateStyle());
    }

    public render() {
        return (
            <div ref={this.refobject} className="right_component">
                <UserFeed />
                <BookmarksList />
            </div>
        );
    }
}

export default requiresLogin(RightComponent);
