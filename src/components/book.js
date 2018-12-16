import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BookPlacement from './book_placement';

export default class Book extends Component {
    OnBookAssignedToMe = ()=>
    {
    }
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
                        <Text style={styles.grey_text}> {this.props.author}</Text>    
                    </View>
                    <BookPlacement owner={this.props.owner} holder={this.props.holder} callback={this.OnBookAssignedToMe}/>

                </td>
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