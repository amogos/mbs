import React, { useState } from 'react';
import FacebookLogin, { FacebookLogout } from './networks/facebook_login';
import GoogleLoginComponent, { GoogleLogoutComponent } from './networks/google_login';
import MockLogin, { MockLogout } from './networks/mock_login';
import CustomLogin, { CustomLogout } from './networks/custom_login';
import * as DataTypes from './../../../shared/types';
import { SocialNetwork } from './../../../shared/constants/social_networks_constants';
import { Divider, Button, Input, Icon } from 'antd';
import { useInput } from './../hooks/use_input';

interface Props {
    userdata: DataTypes.UserRecordType;
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    logoutUser(): void;
    onSignUpClick?: () => void;
    onSignInClick?: () => void;
}

const inputFields = {
    name: '',
    email: '',
    password: '',
};

const SignIn = (props: Props) => {
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
                <Button type="link" onClick={props.onSignUpClick}>
                    Sign up here!
                </Button>
            </span>
        </div>
    );
};

const SignUp = (props: Props) => {
    return (
        <div className="signup_form">
            <p>Sign up</p>
            <Input
                style={{ width: '335px' }}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                {...useInput('Name', '', (value: string) => (inputFields.name = value))}
            />

            <Input
                style={{ width: '335px' }}
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                {...useInput('Email', '', (value: string) => (inputFields.email = value))}
            />

            <Input
                style={{ width: '335px' }}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                {...useInput('Password', '', (value: string) => {
                    inputFields.password = value;
                })}
            />

            <Button
                className="custom_button"
                onClick={() => {
                    const userInfo: DataTypes.UserValueType = DataTypes.NullUser;
                    userInfo.name = inputFields.name;
                    userInfo.email = inputFields.email;
                    userInfo.password = inputFields.password;
                    userInfo.socialnetwork = SocialNetwork.custom;
                }}
            >
                SignUp
            </Button>
            <span>
                Already a member?
                <Button type="link" onClick={props.onSignInClick}>
                    Sign In here!
                </Button>
            </span>
        </div>
    );
};

const Login = (props: Props) => {
    const [login, setLogin] = useState(true);
    return login ? (
        <SignIn {...props} onSignUpClick={() => setLogin(false)} />
    ) : (
        <SignUp {...props} onSignInClick={() => setLogin(true)} />
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
        case SocialNetwork.custom:
            return <CustomLogout {...props} />;
    }
    return null;
};
