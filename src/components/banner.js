import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FacebookConnect from './facebook_connect'

export default class Banner extends Component {
    render() {
         return (
            <View style={styles.app}>
                <View style={styles.appHeader}>
                    <Text style={styles.appTitle}> <span aria-labelledby='jsx-a11y/accessible-emoji' role='img'>⚛️ </span></Text>
                    <Button title="Search" color="#00000000" onPress={() => this.props.onClicked('search')} />
                    <Button title="Add Book" color="#00000000" onPress={() => this.props.onClicked('add')} />
                    <FacebookConnect {...this.props}/>
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