import React from 'react';
import * as DataTypes from '../types';
import FacebookContainer from './../containers/facebook_container';
import { Avatar } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const SocialLoginComponent = (props: Props) => {
    let content;
    if (props.userdata && props.userdata.name) {
        content = (
            <span>
                <Avatar src={props.userdata.picture} /> Profile
            </span>
        );
    } else {
        content = <FacebookContainer />;
    }
    return content;
};

export default SocialLoginComponent;
