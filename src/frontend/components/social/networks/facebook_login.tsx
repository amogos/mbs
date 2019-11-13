import React from 'react';
import FacebookLoginComponent from 'react-facebook-login';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../aux_component';
import { Button } from 'antd';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
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
    const userInfo: DataTypes.UserValueType = {
        name: response.name,
        email: email,
        picture: response.picture.data.url,
        following: [],
        rating: 0,
    };
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
            icon="fa-facebook"
        />
    );
};

export default withStyle(FacebookLogin, 'login');

declare global {
    interface Window {
        FB: any;
    }
}

export const FacebookLogout = (props: Props) => {
    const onSignOutPressed = () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        window.FB.logout(function(response: any) {});
    };
    return (
        <Button type="link" onClick={() => onSignOutPressed()}>
            Logout
        </Button>
    );
};
