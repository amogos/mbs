import React from 'react';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from '../hooks/hooks';
import FeedItem from './feed_item';
import { History } from 'history';
import { AppPages } from '../../../shared/types';

interface Props {
    userFeed: DataTypes.UserFeedRecordType[];
    history: History;
}

const UserFeedComponentSmall = (props: Props) => {
    const nVisibleItems = 4;
    const { userFeed } = props;

    if (!userFeed) {
        return null;
    }

    return (
        <Aux>
            <div className="user_feed_banner" onClick={() => props.history.push(`/${AppPages.Feed}`)}>
                <h2>News Feed</h2>
            </div>

            {props.userFeed === undefined
                ? null
                : React.Children.toArray(userFeed.slice(0, nVisibleItems).map(item => <FeedItem item={item} />))}
        </Aux>
    );
};

export default withRouter(withStyle(UserFeedComponentSmall, 'user_feed_component_small'));
