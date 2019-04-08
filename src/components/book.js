import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BookPlacement from './book_placement';
import BookRemover from './book_remover';

function BookLeftSide(props) {
    return (
        <td>
            <img
                src={props.value.image}
                alt="new" width={64} height={64} mode='fit' allign='center'
            />
            <BookRemover {...props} />
        </td>)

}

function BookRightSide(props) {
    return (
        <td>
            <View style={styles.description}>
                <Text style={styles.title}> {props.value.title}</Text>
                <Text style={styles.language}> ({props.value.language})</Text>
                <Text style={styles.grey_text}> {props.value.author}</Text>

            </View>
            <BookPlacement {...props} />

        </td>);
}

export default class Book extends Component {
    componentWillReceiveProps(props) {
        if (props.counter !== this.props.counter) {
            this.setState(this.state);
        }
    }

    render() {
        return (
            <tr>
                <BookLeftSide {...this.props} />
                <BookRightSide {...this.props} />
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