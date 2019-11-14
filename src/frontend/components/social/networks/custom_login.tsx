import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { Button } from 'antd';
import { withStyle } from '../../aux_component';
import { SocialNetwork } from './../../../../shared/constants/social_networks_constants';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
    logoutUser(): void;
}
const CustomLogin = (props: Props) => {
    return (
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
    );
};

export default withStyle(CustomLogin, 'custom_login');

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
