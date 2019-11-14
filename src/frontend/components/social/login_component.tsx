import React from 'react';
import FacebookLogin, { FacebookLogout } from './networks/facebook_login';
import GoogleLoginComponent, { GoogleLogoutComponent } from './networks/google_login';
import MockLogin, { MockLogout } from './networks/mock_login';
import * as DataTypes from './../../../shared/types';
import { SocialNetwork } from './../../../shared/constants/social_networks_constants';
import { Divider } from 'antd';
interface Props {
    userdata: DataTypes.UserRecordType;
    loginUser(userInfo: DataTypes.UserValueType): void;
    logoutUser(): void;
}

const Login = (props: Props) => {
    return (
        <div className="login">
            <Divider />
            <p>OR Login with social media account</p>
            <FacebookLogin {...props} />
            <GoogleLoginComponent {...props} />
            <MockLogin {...props} />
        </div>
    );
};

export default Login;

export const Logout = (props: Props) => {
    switch (props.userdata.socialnetwork) {
        case SocialNetwork.facebook:
            return <FacebookLogout {...props} />;
        case SocialNetwork.google:
            return <GoogleLogoutComponent {...props} />;
        case SocialNetwork.mock:
            return <MockLogout {...props} />;
    }
    return null;
};
