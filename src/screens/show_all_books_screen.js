import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import Book from '../components/book';

export default class ShowAllBooksScreen extends Component {
    static screenId = 'search';
    render() {
        return (
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                <table border="0px">
                    <FlatList
                        data={this.props.apiData}
                        renderItem={({ item }) => <Book {...item}/>}
                    />
                </table>
            </View>
        )
    }
}

