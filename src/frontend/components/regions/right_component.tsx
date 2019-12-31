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
    refobj: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.refobj = React.createRef<HTMLDivElement>();
    }

    public componentDidMount() {
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    public componentDidUpdate() {
        window.onscroll = debounce(() => this.updateStyle(), 10);
    }

    private updateStyle() {
        const element = this.refobj.current;
        if (!element) return;

        const scrollNeededForFixedStyle = 80;
        const scrollAmount = element.clientHeight - document.documentElement.scrollTop;

        if (document.documentElement.scrollTop > scrollNeededForFixedStyle && scrollAmount < window.innerHeight) {
            element.className = 'right_component_fixed';
        } else {
            element.className = 'right_component';
        }
    }

    public render() {
        return (
            <div ref={this.refobj}>
                <BookmarksList />
                <UserFeed />
            </div>
        );
    }
}

export default requiresLogin(RightComponent);
