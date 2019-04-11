import React from 'react'
import { Text } from 'react-native'
import SocialConnector from '../connectors/social_connector';

interface Props {
    socialconnector: SocialConnector;
}
interface State {

}

export default class SocialLogin extends React.Component<Props, State> {
    render() {
        let content;
        let socialConnector = this.props.socialconnector;

        if (socialConnector.getLoggedIn()) {
            content = (<Text style={{ color: 'white' }} >Welcome: {socialConnector.getUserInfo().name} </Text>);

        } else {
            content = socialConnector.getView();
        }
        return content;

    }
}