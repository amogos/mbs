import React from 'react';
import * as DataTypes from '../../types';
import FacebookContainer from '../../containers/facebook_container';
import { Avatar } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const SocialLoginComponent = (props: Props) => {
    const loggedIn = props.userdata && props.userdata.name;
    if (loggedIn) {
        return (
            <span>
                <Avatar src={props.userdata.picture} /> Profile
            </span>
        );
    } else {
        return <FacebookContainer />;
    }
};

export default SocialLoginComponent;
