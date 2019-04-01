import React, { Component } from 'react'
import { Text } from 'react-native'
import FacebookLogin from 'react-facebook-login';

export default class FacebookConnect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            name: ''
        }
        this.responseFacebook = this.responseFacebook.bind(this);
        this.componentClicked = this.componentClicked.bind(this);
    }
    responseFacebook = response => {
         this.setState({
            isLoggedIn: true,
            name: response.name,
        });
        this.props.context.callbacks.onFacebookConnect(response);
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