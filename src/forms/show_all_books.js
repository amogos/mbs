import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class ShowAllBooksForm extends Component {
    constructor(props) {
        super(props);
        state = {
            apiData: []
        };
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={apiData}
                    renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                />
            </View>
        )
    }
}
