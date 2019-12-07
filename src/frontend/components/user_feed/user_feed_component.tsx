import React from 'react';
import * as DataTypes from '../../../shared/types';
import { withStyle } from './../hooks/hooks';
import { withRouter } from 'react-router-dom';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: any;
}

const UserFeedComponent = (props: Props) => {
    return props.userfeed.map(item => {
        switch (item.id) {
            case DataTypes.UserFeedType.LIKES_BOOK: {
            }
        }
    });
};

export default withRouter(withStyle(UserFeedComponent, 'user_feed_component'));
