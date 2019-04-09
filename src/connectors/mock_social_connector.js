import React from 'react'
import { Text } from 'react-native';
import SocialConnector from './social_connector'

export default class MockSocialConnector extends SocialConnector {
    init() {
    }

    getView() {
         return (<Text> Mock Login </Text>);
    }

    getLoggedIn() {
       return true;
    }

    getUserInfo() {
        return {name:"Mock User", email:"mock_email@gmail.com"};
    }
}