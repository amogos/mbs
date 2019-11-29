import React from 'react';
import FacebookLoginComponent from 'react-facebook-login';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../hooks/hooks';
import { Button } from 'antd';
import { SocialNetwork } from './../../../../shared/constants/social_networks_constants';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    logoutUser(): void;
}

const responseFacebook = (response: any, props: Props) => {
    if (!response.name) return;
    const testUserEmail = (response.name as string)
        .trim()
        .toLowerCase()
        .concat('@gmail.com')
        .split(' ')
        .join('');
    const email = response.email === undefined ? testUserEmail : response.email;
    const userInfo: DataTypes.UserValueType = DataTypes.NullUserRecordType();
    userInfo.name = response.name;
    userInfo.email = email;
    userInfo.picture = response.picture.data.url;
    userInfo.socialnetwork = SocialNetwork.facebook;
    props.loginUser(userInfo);
};

const componentClicked = () => {};

const FacebookLogin = (props: Props) => {
    return (
        <FacebookLoginComponent
            appId="298690497437467"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile"
            onClick={componentClicked}
            callback={response => responseFacebook(response, props)}
            textButton="Facebook"
            cssClass="facebook_button"
            icon="fa-facebook"
        />
    );
};

export default withStyle(FacebookLogin, 'facebook_login');

declare global {
    interface Window {
        FB: any;
    }
}

export const FacebookLogout = (props: Props) => {
    const onSignOutPressed = () => {
        props.logoutUser();
    };
    return (
        <Button type="link" onClick={() => onSignOutPressed()}>
            Logout
        </Button>
    );
};
