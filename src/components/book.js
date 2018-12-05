import React, { Component } from 'react'
import {Text, StyleSheet } from 'react-native'

export default class Book extends Component {
    render() {
        return <Text style={styles.title}>
            {this.props.title}
            <Text style={styles.language}> ({this.props.language}) </Text>
            <Text style={styles.author}><br />{this.props.author}</Text>
        </Text>
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        height: 50,
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    author: {
        fontSize: 13,
        color: 'gray',
        fontWeight: 'normal'
    },

    language: {
        fontSize: 13,
        color: 'black',
        fontStyle: 'italic'
    },

})