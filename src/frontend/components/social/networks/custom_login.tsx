import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { Button, Input, Icon, message } from 'antd';
import { SocialNetwork } from './../../../../shared/constants/social_networks_constants';
import { useInput } from './../../hooks/use_input';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    logoutUser(): void;
}

const fields = { username: '', password: '' };

const CustomLogin = (props: Props) => {
    return (
        <div className="custom_login">
            <Input
                style={{ width: '335px' }}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                {...useInput('Email', '', (value: string) => (fields.username = value))}
            />

            <Input
                style={{ width: '335px' }}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                {...useInput('Password', '', (value: string) => {
                    fields.password = value;
                })}
            />

            <Button
                className="custom_button"
                onClick={() => {
                    const userInfo: DataTypes.UserValueType = DataTypes.NullUser;
                    userInfo.email = fields.username;
                    userInfo.password = fields.password;
                    userInfo.socialnetwork = SocialNetwork.custom;
                    props.loginUser(userInfo, () => message.error('Account does not exist.'));
                }}
            >
                LogIn
            </Button>
        </div>
    );
};

export default CustomLogin;

export const CustomLogout = (props: Props) => {
    const onLogoutSuccess = () => {
        props.logoutUser();
    };
    return (
        <Button type="link" onClick={onLogoutSuccess}>
            Logout
        </Button>
    );
};
