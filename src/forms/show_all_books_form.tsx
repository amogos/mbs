import React from 'react'
import { View, FlatList } from 'react-native'
import Book from '../components/book_component'
import * as Types from "./../types";

export default class ShowAllBooksForm extends React.Component<any, any> {
    componentWillReceiveProps(props: any) {
        if (props.counter !== this.props.counter) {
            this.setState(this.state);
        }
    }
    render() {
        return (
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                <table>
                    <FlatList<Types.BookRecordType> data={this.props.items} extraData={this.props.counter} renderItem={({ item }) => {
                        return <Book id={item.id} alue={item.value} userdata={this.props.userdata} counter={this.props.counter} />;
                    }>}
                    />
                </table>
            </View>
        )
    }
}S