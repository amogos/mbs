import React from 'react'
import { Text } from 'react-native'


const SocialLoginComponent = (props: any) => {
    let content;
    let socialconnector = props.socialconnector;
    if (socialconnector.getLoggedIn()) {
        content = (<Text style={{ color: 'white' }} >Welcome: {socialconnector.getUserInfo().name} </Text>);

    } else {
        content = props.socialconnector.getView();
    }
    return content;
}

export default SocialLoginComponent