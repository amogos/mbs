import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import SocialLoginContainer from './../containers/social_login_container'

const BannerComponent = (props: any) => {
    return (
        <View style={styles.app}>
            <View style={styles.appHeader}>
                <Text style={styles.appTitle}> <span aria-labelledby='jsx-a11y/accessible-emoji' role='img'>⚛️ </span></Text>
                <Button title="Search" color="#00000000" onPress={() => props.gotoListBooks()} />
                <Button title="Add Book" color="#00000000" onPress={() => props.gotoAddBook()} />
                <SocialLoginContainer />
            </View>
        </View>
    )
}

export default BannerComponent;

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