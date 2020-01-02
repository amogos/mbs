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
    scrollspeed: number;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
        this.scrollspeed = 1;
    }

    private UpdateScrollSpeed() {
        const element = this.refobject.current;

        if (!element) return;
        if (!element.parentElement) return;

        let maxScrollHeight = element.scrollHeight;

        for (let i = 0; i < element.parentElement.children.length; i++) {
            const scrollHeight = element.parentElement.children[i].scrollHeight;
            if (scrollHeight > maxScrollHeight) maxScrollHeight = scrollHeight;
        }
        this.scrollspeed = element.scrollHeight / maxScrollHeight;
    }

    private updateStyle() {
        const element = this.refobject.current;

        if (!element) return;

        const top = -document.documentElement.scrollTop * this.scrollspeed;
        element.style.setProperty('top', `${top}px`);
    }

    public componentDidMount() {
        window.addEventListener('scroll', () => this.updateStyle());
    }

    public render() {
        return (
            <div ref={this.refobject} className="right_component">
                <BookmarksList />
                <UserFeed />
            </div>
        );
    }
}

export default requiresLogin(RightComponent);
