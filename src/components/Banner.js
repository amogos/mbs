import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import AddNewBookScreen from '../screens/add_new_book_screen';
import ShowAllBooksScreen from '../screens/show_all_books_screen';

export default class Banner extends Component {
    render() {
        const { callback } = this.props;
        return (
            <View style={styles.app}>
                <View style={styles.appHeader}>
                    <Text style={styles.appTitle}> ⚛️ </Text>
                </View>
                <Button title="Search" onPress={()=>callback('search')} />
                <Button title="Add Book" onPress={()=>callback('add')} />
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