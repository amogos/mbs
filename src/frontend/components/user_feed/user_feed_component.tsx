import React from 'react';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from './../hooks/hooks';
import FeedItem from './feed_item';
import { History } from 'history';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: History;
}

const UserFeedComponent = (props: Props) => {
    const nVisibleItems = 5;
    return (
        <Aux>
            <div className="user_feed_banner">
                <h2>News Feed</h2>
            </div>

            {props.userfeed === undefined
                ? null
                : props.userfeed.slice(0, nVisibleItems).map((item, index) => (
                      <div key={index}>
                          <FeedItem item={item} />
                      </div>
                  ))}
        </Aux>
    );
};

export default withRouter(withStyle(UserFeedComponent, 'user_feed_component'));
