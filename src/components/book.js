import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

export default class Book extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img
                        src={this.props.image}
                        alt="new" width={64} height={64} mode='fit' alignItems='center'
                    />
                </td>
                <td>
                    <Text style={styles.title}>
                        {this.props.title}
                        <Text style={styles.language}> ({this.props.language}) </Text>
                        <Text style={styles.author}><br />{this.props.author}</Text>
                    </Text>
                </td>
            </tr>


        );
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        height: 70,
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