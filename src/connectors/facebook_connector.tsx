import React from 'react'
import SocialConnector from './social_connector'
import EventBus from './../utils/event_bus'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import * as Types from "../types"

export default class FacebookConnector extends SocialConnector {
    init() {}

    responseFacebook = (response: ReactFacebookLoginInfo) => {
        var userInfo: Types.UserType = { name: response.name, email: response.email } as Types.UserType;
        EventBus.getInstance().fireEvent("onSocialConnect", userInfo);
    }

    componentClicked = () => { }

    getView() {
        return (<FacebookLogin
            appId="298690497437467"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            icon="fa-facebook" />);
    }
}