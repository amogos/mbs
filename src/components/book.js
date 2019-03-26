import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BookPlacement from './book_placement';

var onBookAssignedToMe = () => {
}

function BookImage(props) {
    return (
        <td>
            <img
                src={props.image}
                alt="new" width={64} height={64} mode='fit' allign='center'
            />

        </td>)

}

function BookDescriptor(props) {
    return (
        <td>
            <View style={styles.description}>
                <Text style={styles.title}> {props.title}</Text>
                <Text style={styles.language}> ({props.language})</Text>
                <Text style={styles.grey_text}> {props.author}</Text>
            </View>
            <BookPlacement owner={props.owner} holder={props.holder} callback={onBookAssignedToMe} userdata={props.userdata} />

        </td>);

}

export default class Book extends Component {
    render() {
        return (
            <tr>
                <BookImage {...this.props} />
                <BookDescriptor {...this.props} />
            </tr>
        );
    }
}

const styles = StyleSheet.create({
    description:
    {
        flex: 1,
        height: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {

        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',

    },
    grey_text: {
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