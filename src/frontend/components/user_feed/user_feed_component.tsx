import React from 'react';
import { Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from './../hooks/hooks';
import FeedItem from './feed_item';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: any;
}

const UserFeedComponent = (props: Props) => {
    return (
        <Aux>
            <h2>News Feed</h2>
            <Divider />
            <Aux>{props.userfeed === undefined ? null : props.userfeed.map(item => <FeedItem item={item} />)}</Aux>
        </Aux>
    );
};

export default withRouter(withStyle(UserFeedComponent, 'user_feed_component'));
