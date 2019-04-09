import React, { Component } from 'react'
import { Text } from 'react-native'

export default class SocialLogin extends Component {
    render() {
        let content;
        let socialConnector = this.props.socialconnector;

        if (socialConnector.getLoggedIn()) {
            content = (
                <Text style={{ color: 'white' }} >Welcome: { socialConnector.getUserInfo().name } </Text>
            );

        } else {
            content = socialConnector.getView();
        }
        return content;

    }
}