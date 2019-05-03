import React from 'react'
import { Text } from 'react-native'


const SocialLoginComponent = (props: any) => {
    let content;
    let userdata = props.userdata;
    if (userdata) {
        content = (<Text style={{ color: 'white' }} >Welcome: {userdata.name} </Text>);

    } else {
        content = props.socialconnector.getView();
    }
    return content;
}

export default SocialLoginComponent