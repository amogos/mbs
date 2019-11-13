import React from 'react';
import GoogleLogin from 'react-google-login';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../aux_component';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
}

const responseGoogle = (response: any) => {
    alert(response);
};

const Login = (props: Props) => {
    return (
        <GoogleLogin
            clientId="627289196388-0bfojj3tg8pmm9h178f0751mi3j9oibe.apps.googleusercontent.com"
            buttonText="GoogleLogin"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default withStyle(Login, 'google_login');
