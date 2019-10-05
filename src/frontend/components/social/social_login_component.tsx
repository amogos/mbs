import React from 'react';
import * as DataTypes from '../../../shared/types';
import FacebookLogin from './facebook_login';
import { Avatar } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
    loginUser(userInfo: DataTypes.UserValueType): void;
}

const SocialLoginComponent = (props: Props) => {
    const loggedIn = props.userdata && props.userdata.name;
    if (loggedIn) {
        return <Avatar src={props.userdata.picture} />;
    } else {
        return <FacebookLogin {...props} />;
    }
};

export default SocialLoginComponent;
