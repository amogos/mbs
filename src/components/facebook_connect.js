import React, { Component } from 'react'
import { Text } from 'react-native'
import FacebookLogin from 'react-facebook-login';
import EventBus from 'react-native-event-bus'

export default class FacebookConnect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            name: ''
        }
    }
    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            name: response.name,
        });

        EventBus.getInstance().fireEvent("onFacebookConnect", { param: response });
    }

    componentClicked = () => {
    }

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <Text style={{ color: 'white' }} >Welcome: {this.state.name} </Text>
            );

        } else {
            fbContent = (<FacebookLogin
                appId="298690497437467"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                icon="fa-facebook" />);
        }
        return fbContent;

    }
}