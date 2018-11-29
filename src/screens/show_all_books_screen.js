import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

export default class ShowAllBooksScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [{title:'some title1', author:'author1'},
            {title:'some title2', author:'author2'}]
        };
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={this.state.apiData}
                    renderItem={({ item }) => <Text>{item.title}</Text>}
                />
            </View>
        )
    }
}