import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BookPlacement from './book_placement_component'
import BookRemover from './book_remover_component'

function BookLeftSide(props: any) {
    return (
        <td>
            <img src={props.value.image} alt="new" width={64} height={64} />
            <BookRemover {...props} />
        </td>)

}

function BookRightSide(props: any) {
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

export default class Book extends React.Component<any, any> {
    componentWillReceiveProps(props: any) {
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