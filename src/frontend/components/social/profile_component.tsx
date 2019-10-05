import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar } from 'antd';
import { requiresLogin } from './../aux_component';
import FacebookLogin from './facebook_login';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const ProfileComponent = (props: Props) => {
    return <Avatar src={props.userdata.picture} />;
};

export default requiresLogin(ProfileComponent, FacebookLogin);
