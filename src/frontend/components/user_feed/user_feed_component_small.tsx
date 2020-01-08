import React from 'react';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from '../hooks/hooks';
import FeedItem from './feed_item';
import { History } from 'history';
import { AppPages } from '../../../shared/types';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: History;
}

const UserFeedComponentSmall = (props: Props) => {
    const nVisibleItems = 4;
    const { userfeed } = props;

    if (!userfeed) {
        return null;
    }

    return (
        <Aux>
            <div className="user_feed_banner" onClick={() => props.history.push(`/${AppPages.Feed}`)}>
                <h2>News Feed</h2>
            </div>

            {props.userfeed === undefined
                ? null
                : React.Children.toArray(userfeed.slice(0, nVisibleItems).map(item => <FeedItem item={item} />))}
        </Aux>
    );
};

export default withRouter(withStyle(UserFeedComponentSmall, 'user_feed_component_small'));
