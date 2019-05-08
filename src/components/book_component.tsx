import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BookPlacementContainer from './../containers/book_placement_container'
import BookRemoverContainer from './../containers/book_remover_container'
import * as Types from "./../types";

interface Props {
    id: string | null;
    value: Types.BookValueType;
    userdata: Types.UserType;
    extraData: string
}

interface State {
}

function BookLeftSide(props: Props) {
    return (
        <td>
            <img src={props.value.image} alt="new" width={64} height={64} />
            <BookRemoverContainer {...props} />
        </td>)

}

function BookRightSide(props: Props) {
    return (
        <td>
            <View style={styles.description}>
                <Text style={styles.title}> {props.value.title}</Text>
                <Text style={styles.language}> ({props.value.language})</Text>
                <Text style={styles.grey_text}> {props.value.author}</Text>

            </View>
            <BookPlacementContainer {...props} />

        </td>);
}

export default class Book extends React.Component<Props, State> {
    componentWillReceiveProps(props: Props) {
        if (props.extraData === this.props.extraData) {
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