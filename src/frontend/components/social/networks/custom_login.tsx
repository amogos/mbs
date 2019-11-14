import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { Button, Input, Icon } from 'antd';
import { SocialNetwork } from './../../../../shared/constants/social_networks_constants';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
    logoutUser(): void;
}
const CustomLogin = (props: Props) => {
    return (
        <div className="custom_login">
            <div>
                <Input
                    style={{ width: '335px' }}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                />
            </div>
            <div>
                <Input
                    style={{ width: '335px' }}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />
            </div>
            <Button
                className="custom_button"
                onClick={() => {
                    const userInfo: DataTypes.UserValueType = {
                        name: 'Iulia Mogos',
                        email: 'daosmistique@yahoo.com',
                        picture: '',
                        following: [],
                        rating: 0,
                        socialnetwork: SocialNetwork.mock,
                    };
                    props.loginUser(userInfo);
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
