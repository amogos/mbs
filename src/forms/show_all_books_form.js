import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import Book from '../components/book'

export default class ShowAllBooksForm extends Component {
    render() {
        return (
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                <table border="0px">
                    <FlatList
                        data={this.props.items}
                        renderItem={({ item }) => <Book {...item} context={this.props.context}
                            callbacks={this.props.callbacks} />}
                    />
                </table>
            </View>
        )
    }
}