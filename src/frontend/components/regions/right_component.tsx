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

    public componentDidMount() {
        if (!this.refobject.current) return;

        const children = this.refobject.current.children;
        let contentHeight = 0;

        if (children) {
            for (let i = 0; i < children.length; i++) {
                contentHeight += children[i].clientHeight;
            }
        }

        this.clientHeight = contentHeight;
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    public componentDidUpdate() {
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    private updateStyle() {
        const element = this.refobject.current;

        if (!element) return;

        const scrollAmount = this.clientHeight - window.innerHeight;

        console.log(`scrolltop ${document.documentElement.scrollTop.toString()}`);
        console.log(`height ${document.documentElement.scrollHeight.toString()}`);
        console.log(`client height ${this.clientHeight.toString()}`);
        console.log(`window height ${window.innerHeight.toString()}`);
        console.log(`scroll amount ${scrollAmount.toString()}`);

        if (document.documentElement.scrollTop > scrollAmount) {
            const top = `${-scrollAmount}px`;
            element.style.setProperty('top', top);
            element.style.setProperty('left', '65%');
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
