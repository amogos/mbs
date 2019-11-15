import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../aux_component';
import { Button } from 'antd';
import { SocialNetwork } from './../../../../shared/constants/social_networks_constants';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
    logoutUser(): void;
}

const GoogleLoginComponent = (props: Props) => {
    const responseGoogle = (response: any) => {
        if (response.profileObj) {
            const userInfo: DataTypes.UserValueType = DataTypes.NullUser;
            userInfo.name = response.profileObj.name;
            userInfo.email = response.profileObj.email;
            userInfo.picture = response.profileObj.imageUrl;
            userInfo.socialnetwork = SocialNetwork.google;
            props.loginUser(userInfo);
        }
    };
    return (
        <GoogleLogin
            clientId="627289196388-rldfh2n0j649bh2qovuqvtf4a038louo.apps.googleusercontent.com"
            buttonText="GoogleLogin"
            scope="email"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="google_button"
        />
    );
};

export default withStyle(GoogleLoginComponent, 'google_login');

export const GoogleLogoutComponent = (props: Props) => {
    const onLogoutSuccess = () => {
        props.logoutUser();
    };
    return (
        <GoogleLogout
            clientId="627289196388-rldfh2n0j649bh2qovuqvtf4a038louo.apps.googleusercontent.com"
            onLogoutSuccess={onLogoutSuccess}
            render={renderProps => (
                <Button type="link" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Logout
                </Button>
            )}
        ></GoogleLogout>
    );
};
