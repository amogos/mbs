import React from 'react';
import * as DataTypes from '../../../shared/types';
import { withStyle } from './../hooks/hooks';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
}

const UserFeedComponent = (props: Props) => {
    return props.userfeed.map(item => {
        switch (item.id) {
            case DataTypes.UserFeedType.LIKES_BOOK: {
            }
        }
    });
};

export default withStyle(UserFeedComponent, 'user_feed_component');
