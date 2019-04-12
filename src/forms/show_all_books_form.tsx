import React from 'react'
import { View, FlatList } from 'react-native'
import Book from '../components/book_component'
import * as Types from "./../types";

interface Props {
    counter: number;
    userdata: Types.UserType;
    items: Types.BookRecordType[];
}
interface State { }

export default class ShowAllBooksForm extends React.Component<Props, State> {
    componentWillReceiveProps(props: Props) {
        if (props.counter !== this.props.counter) {
            this.setState(this.state);
        }
    }
    render() {
        return (
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                <table>
                    <FlatList<Types.BookRecordType> data={this.props.items} extraData={this.props.counter} renderItem={({ item }) => {
                        return <Book id={item.id} value={item.value} userdata={this.props.userdata} counter={this.props.counter} />;
                    }} />
                </table>
            </View>
        )
    }
}