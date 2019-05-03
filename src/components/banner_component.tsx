import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import EventBus from './../utils/event_bus'
import SocialLoginContainer from './../containers/social_login_container'
import SocialConnector from '../connectors/social_connector';
import DatabaseConnector from '../connectors/database_connector';



export default class Banner extends React.Component {
    render() {
        return (
            <View style={styles.app}>
                <View style={styles.appHeader}>
                    <Text style={styles.appTitle}> <span aria-labelledby='jsx-a11y/accessible-emoji' role='img'>⚛️ </span></Text>
                    <Button title="Search" color="#00000000" onPress={() => EventBus.getInstance().fireEvent("onBannerButtonClicked", { param: "search" })} />
                    <Button title="Add Book" color="#00000000" onPress={() => EventBus.getInstance().fireEvent("onBannerButtonClicked", { param: "add" })} />
                    <SocialLoginContainer />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    app: {
        flex: 0
    },
    appHeader: {
        flex: 1,
        backgroundColor: '#222',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    appTitle: {
        fontSize: 16,
        color: 'white'
    },

})