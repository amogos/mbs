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

interface State {
    scrollTop: number;
    fixed: boolean;
    dy: number;
}

class RightComponent extends React.Component<Props, State> {
    refobject: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
    }

    public componentDidMount() {
        this.setState({ scrollTop: 0 });
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    public componentDidUpdate() {
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    private updateStyle() {
        const element = this.refobject.current;

        if (!element) return;

        const scrollMargin = 200;
        const scrollAmount = element.scrollHeight - document.documentElement.clientHeight + scrollMargin;

        if (document.documentElement.scrollTop > scrollAmount) {
            this.setState({ ...this.state, fixed: true, dy: -document.documentElement.scrollTop });
            const top = -document.documentElement.scrollTop;
            element.style.setProperty('top', `${top}px`);
            element.style.setProperty('left', '62%');
            element.style.setProperty('position', 'fixed');
        } else if (document.documentElement.scrollTop <= 0) {
            element.style.setProperty('position', 'relative');
            element.style.removeProperty('left');
            element.style.removeProperty('top');
            this.setState({ ...this.state, fixed: false });
        } else if (this.state.fixed) {
            const dy = this.state.dy + this.state.scrollTop - document.documentElement.scrollTop;
            this.setState({ ...this.state, dy: dy });
            element.style.setProperty('top', `${dy}px`);
        }

        this.setState({ ...this.state, scrollTop: document.documentElement.scrollTop });
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
