import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

export default class ShowAllBooksScreen extends Component {
    static screenId = 'search';
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={this.props.apiData}
                    renderItem={({ item }) => <Text>{item.title} by {item.author}</Text>}
                />
            </View>
        )
    }
}

