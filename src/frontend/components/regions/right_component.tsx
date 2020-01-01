import React from 'react';
import debounce from 'lodash.debounce';
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
    clientHeight: number;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
        this.clientHeight = 0;
    }

    private computeClientHeight(): number {
        if (!this.refobject.current) return 0;

        const children = this.refobject.current.children;
        let contentHeight = 0;

        if (children) {
            for (let i = 0; i < children.length; i++) {
                contentHeight += children[i].clientHeight;
            }
        }

        return contentHeight;
    }

    public componentDidMount() {
        this.clientHeight = this.computeClientHeight();
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    public componentDidUpdate() {
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    private updateStyle() {
        const element = this.refobject.current;

        if (!element) return;

        const scrollMargin = 100;
        const scrollAmount = this.clientHeight - window.innerHeight + scrollMargin;

        if (document.documentElement.scrollTop > scrollAmount) {
            element.style.setProperty('top', `${-scrollAmount}px`);
            element.style.setProperty('left', '62%');
            element.style.setProperty('position', 'fixed');
        } else {
            element.style.setProperty('position', 'relative');
            element.style.removeProperty('left');
            element.style.removeProperty('top');
        }
    }

    public render() {
        return (
            <div ref={this.refobject}>
                <BookmarksList />
                <UserFeed />
            </div>
        );
    }
}

export default requiresLogin(RightComponent);
