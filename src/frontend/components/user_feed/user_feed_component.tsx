import React from 'react';
import { Divider, Comment, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from './../hooks/hooks';
import { CustomDate } from './../../../shared/utils/CustomDate';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: any;
}

const BookFeedItem = (props: { item: DataTypes.UserFeedRecordType }) => {
    const { item } = props;
    const title = `${item.user.name} ${new CustomDate(item.date).toString()}`;
    return (
        <Comment
            author={<a>{title}</a>}
            avatar={<Avatar src={item.user.picture} alt={item.user.name} />}
            content={
                <p>
                    {DataTypes.UserFeedTypeToString(item.type)}:{' '}
                    {item.bookDescription ? item.bookDescription.title : ''}
                </p>
            }
        />
    );
};

const FeedItem = (props: { item: DataTypes.UserFeedRecordType }) => {
    const { item } = props;
    switch (item.type) {
        case DataTypes.UserFeedType.REMOVED_BOOK:
        case DataTypes.UserFeedType.REQUESTED_BOOK:
        case DataTypes.UserFeedType.RENTED_BOOK:
        case DataTypes.UserFeedType.RATED_BOOK:
        case DataTypes.UserFeedType.ADDED_BOOK:
        case DataTypes.UserFeedType.LIKES_BOOK: {
            return <BookFeedItem {...props} />;
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
