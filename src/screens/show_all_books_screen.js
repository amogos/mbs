import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'


export default class ShowAllBooksScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={this.props.apiData}
                    renderItem={({ item }) => <Text>{item.title}  by {item.author}</Text>}
                />
            </View>
        )
    }
}

