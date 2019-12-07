import React from 'react';
import * as DataTypes from '../../../shared/types';
import { withStyle } from './../hooks/hooks';
import { withRouter } from 'react-router-dom';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: any;
}

const FeedItem = (props: { item: DataTypes.UserFeedRecordType }) => {
    const { item } = props;

    switch (item.id) {
        case DataTypes.UserFeedType.LIKES_BOOK: {
            return (
                <div>
                    User {item.user.name} likes book {item.bookDescription ? item.bookDescription.title : ''}
                </div>
            );
        }
        default:
            return null;
    }
};

const UserFeedComponent = (props: Props) => {
    if (props.userfeed === undefined) return null;
    return props.userfeed.map(item => <FeedItem item={item} />);
};

export default withRouter(withStyle(UserFeedComponent, 'user_feed_component'));
