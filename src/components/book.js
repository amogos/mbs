import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Book extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img
                        src={this.props.image}
                        alt="new" width={64} height={64} mode='fit' allign='center'
                    />

                </td>
                <td>
                    <View style={styles.description}>
                        <Text style={styles.title}> {this.props.title}</Text>
                        <Text style={styles.language}> ({this.props.language})</Text>
                        <Text style={styles.author}> {this.props.author}</Text>
                    </View>

                </td>
            </tr>


        );
    }
}

const styles = StyleSheet.create({
    description:
    {
        flex: 5,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {

        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',

    },
    author: {
        fontSize: 13,
        color: 'gray',
        fontWeight: 'normal',

    },

    language: {
        fontSize: 13,
        color: 'black',
        fontStyle: 'italic',
    },

})