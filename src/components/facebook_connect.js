import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FacebookLogin from 'react-facebook-login';

export default class FacebookConnect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: '',
            name: '',
            email: '',
            picture: ''
        }
    }
    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            userId: response.userId,
            name: response.name,
            email: response.email,
            picture: response.picture
        });
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