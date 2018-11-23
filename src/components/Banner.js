import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Banner extends Component {
    render() {
        return (
            <View style={styles.app}>
                <View style={styles.appHeader}>
                    <Text style={styles.appTitle}> ⚛️ </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    appHeader: {
        flex: 1,
        backgroundColor: '#222',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appTitle: {
        fontSize: 16,
        color: 'white'
    },

})