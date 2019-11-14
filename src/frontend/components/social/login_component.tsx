import React from 'react';
import FacebookLogin, { FacebookLogout } from './networks/facebook_login';
import GoogleLoginComponent, { GoogleLogoutComponent } from './networks/google_login';
import MockLogin, { MockLogout } from './networks/mock_login';
import * as DataTypes from './../../../shared/types';
import Aux, { withStyle } from './../aux_component';
import { SocialNetwork } from './../../../shared/constants/social_networks_constants';

interface Props {
    userdata: DataTypes.UserRecordType;
    loginUser(userInfo: DataTypes.UserValueType): void;
    logoutUser(): void;
}

const Login = (props: Props) => {
    return (
        <Aux>
            <FacebookLogin {...props} />
            <GoogleLoginComponent {...props} />
            <MockLogin {...props} />
        </Aux>
    );
};

export default withStyle(Login, 'login');

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
