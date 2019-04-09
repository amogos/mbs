import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import Book from '../components/book_component'

export default class ShowAllBooksForm extends Component {
    componentWillReceiveProps(props) {
        if (props.counter !== this.props.counter) {
            this.setState(this.state);
        }
    }
    render() {
        return (
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                <table border="0px">
                    <FlatList data={this.props.items} extraData={this.props.counter} renderItem={({ item }) => <Book id={item.id} value={item.value} userdata={this.props.userdata} counter={this.props.counter}/>}
                    />
                </table>
            </View>
        )
    }
}