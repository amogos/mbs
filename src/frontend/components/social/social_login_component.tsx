import React from 'react';
import * as DataTypes from '../../../shared/types';
import FacebookComponent from './../social/facebook_component';
import { Avatar } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
    loginUser(userInfo: DataTypes.UserValueType): void;
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
        return <FacebookComponent {...props} />;
    }
};

export default SocialLoginComponent;
