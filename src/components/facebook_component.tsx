import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import * as DataTypes from '../types';

interface Props {
    addUserData(userInfo: DataTypes.UserType): void;
}

const responseFacebook = (response: ReactFacebookLoginInfo, props: Props) => {
    let testUserEmail = (response.name as string)
        .trim()
        .toLowerCase()
        .concat('@gmail.com')
        .split(' ')
        .join('');

    let email = response.email === undefined ? testUserEmail : response.email;
    var userInfo: DataTypes.UserType = { name: response.name, email: email } as DataTypes.UserType;
    props.addUserData(userInfo);
};

const componentClicked = () => {};

const FacebookComponent = (props: Props) => {
    return (
        <FacebookLogin
            appId="298690497437467"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={response => responseFacebook(response, props)}
            icon="fa-facebook"
        />
    );
};

export default FacebookComponent;
