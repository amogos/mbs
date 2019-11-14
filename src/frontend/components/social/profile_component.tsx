import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar } from 'antd';
import Aux from './../aux_component';
import { Logout } from './login_component';

interface Props {
    userdata: DataTypes.UserRecordType;
    loginUser(userInfo: DataTypes.UserValueType): void;
    logoutUser(): void;
}

const ProfileComponent = (props: Props) => {
    return (
        <Aux>
            <Avatar src={props.userdata.picture} />
            <Logout {...props} />
        </Aux>
    );
};

export default ProfileComponent;
