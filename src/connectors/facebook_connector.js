import React from 'react'
import SocialConnector from './social_connector'
import EventBus from 'react-native-event-bus'
import FacebookLogin from 'react-facebook-login';

export default class FacebookConnector extends SocialConnector {
    init() {
    }

    responseFacebook = response => {
        this.setLoggedIn(true);
        this.setUserInfo(response);
        EventBus.getInstance().fireEvent("onSocialConnect", { response });
    }

    componentClicked = () => {
    }

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