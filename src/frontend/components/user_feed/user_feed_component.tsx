import React from 'react';
import { Divider } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from './../hooks/hooks';
import { withRouter } from 'react-router-dom';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: any;
}

const FeedItem = (props: { item: DataTypes.UserFeedRecordType }) => {
    const { item } = props;

    switch (item.type) {
        case DataTypes.UserFeedType.LIKES_BOOK: {
            return (
                <div>
                    {item.user.name} likes book {item.bookDescription ? item.bookDescription.title : ''}
                </div>
            );
        }
        default:
            return null;
    }
};

const Feeds = (props: Props) => {
    if (props.userfeed === undefined) return null;
    return (
        <Aux>
            {props.userfeed.map(item => (
                <FeedItem item={item} />
            ))}
        </Aux>
    );
};

const UserFeedComponent = (props: Props) => {
    return (
        <Aux>
            <h2>News Feed</h2>
            <Divider />
            <Feeds {...props} />
        </Aux>
    );
};

export default withRouter(withStyle(UserFeedComponent, 'user_feed_component'));
