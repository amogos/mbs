import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

export default class ShowAllBooksScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { navigation } = this.props;
        const apiData = navigation.getParam('apiData', '[{}]');
       
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