import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar, Menu, Dropdown, Button } from 'antd';
import { Logout } from './login_component';
import Settings from './settings_component';

interface Props {
    userdata: DataTypes.UserRecordType;
    signUpUser(userInfo: DataTypes.UserValueType): void;
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    logoutUser(): void;
}

const ProfileComponent = (props: Props) => {
    const menu = (
        <Menu>
            <Menu.Item>
                <Settings />
            </Menu.Item>
            <Menu.Item>
                <Logout {...props} />
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="link">
                <Avatar src={props.userdata.picture} />
            </Button>
        </Dropdown>
    );
};

export default ProfileComponent;
