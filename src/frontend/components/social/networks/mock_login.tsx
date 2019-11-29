import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { Button } from 'antd';
import { withStyle } from '../../hooks/hooks';
import { SocialNetwork } from './../../../../shared/constants/social_networks_constants';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    logoutUser(): void;
}
const MockLogin = (props: Props) => {
    return (
        <Button
            className="mock_button"
            onClick={() => {
                const userInfo: DataTypes.UserValueType = DataTypes.NullUserRecordType;
                userInfo.name = 'Mock';
                userInfo.email = 'Mock@yahoo.com';
                userInfo.socialnetwork = SocialNetwork.mock;
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
