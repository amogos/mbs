import React, { useState } from 'react';
import FacebookLogin, { FacebookLogout } from './networks/facebook_login';
import GoogleLoginComponent, { GoogleLogoutComponent } from './networks/google_login';
import MockLogin, { MockLogout } from './networks/mock_login';
import CustomLogin, { CustomLogout } from './networks/custom_login';
import * as DataTypes from './../../../shared/types';
import { SocialNetwork } from './../../../shared/constants/social_networks_constants';
import { Divider, Button } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    logoutUser(): void;
}

const Login = (props: Props) => {
    const [login, setLogin] = useState(true);
    if (login) {
        return (
            <div className="login">
                <p>Sign In</p>
                <CustomLogin {...props} />
                <Divider />
                <p>OR Login with social media account</p>
                <FacebookLogin {...props} />
                <GoogleLoginComponent {...props} />
                <MockLogin {...props} />
                <span>
                    Don't have an account?
                    <Button type="link" onClick={() => setLogin(false)}>
                        Sign up here!
                    </Button>
                </span>
            </div>
        );
    } else {
    }
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
        case SocialNetwork.custom:
            return <CustomLogout {...props} />;
    }
    return null;
};
