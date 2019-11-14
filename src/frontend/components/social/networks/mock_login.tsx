import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { Button } from 'antd';
import { withStyle } from '../../aux_component';
import { SocialNetwork } from './../../../../shared/constants/social_networks_constants';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
    logoutUser(): void;
}
const MockLogin = (props: Props) => {
    return (
        <Button
            className="mock_button"
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
            MockLogin
        </Button>
    );
};

export default withStyle(MockLogin, 'mock_login');

export const MockLogout = (props: Props) => {
    const onLogoutSuccess = () => {
        props.logoutUser();
    };
    return (
        <Button type="link" onClick={onLogoutSuccess}>
            Logout
        </Button>
    );
};
