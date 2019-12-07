import React from 'react';
import { Aux, withStyle, requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import BookmarksList from './../../containers/list_bookmarks_container';
import UserFeed from './../../containers/user_feed_container';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const RightComponent = (props: Props) => {
    return (
        <Aux>
            <BookmarksList />
            <UserFeed />
        </Aux>
    );
};

export default requiresLogin(withStyle(RightComponent, 'right_component'));
