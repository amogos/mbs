import React from 'react';
import FacebookLoginComponent from 'react-facebook-login';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../aux_component';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
}

const responseFacebook = (response: any, props: Props) => {
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

const Login = (props: Props) => {
    return (
        <FacebookLoginComponent
            appId="298690497437467"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends,user_actions.books"
            onClick={componentClicked}
            callback={response => responseFacebook(response, props)}
            icon="fa-facebook"
        />
    );
};

export default withStyle(Login, 'login');
