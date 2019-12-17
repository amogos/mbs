import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar } from 'antd';
import { Aux } from './../hooks/hooks';
import { Logout } from './login_component';
import Settings from './settings_component';

interface Props {
    userdata: DataTypes.UserRecordType;
    signUpUser(userInfo: DataTypes.UserValueType): void;
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    logoutUser(): void;
}

const ProfileComponent = (props: Props) => {
    return (
        <Aux>
            <Avatar src={props.userdata.picture} />
            <Logout {...props} />
            <Settings />
        </Aux>
    );
};

export default ProfileComponent;
