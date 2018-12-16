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
                        renderItem={({ item }) => <Book title={item.title} language={item.language} 
                        author={item.author} image={item.image} owner={item.owner} holder={item.holder}/>}
                    />
                </table>
            </View>
        )
    }
}

