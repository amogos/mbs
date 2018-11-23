import React from 'react';
import { View } from 'react-native';
import Banner from '../components/banner';
import AddNewBookForm from '../forms/add_new_book_form';

export default class AddNewBookScreen extends React.Component {
    render() {
        return (
            <View>
                <Banner />
                <AddNewBookForm />
            </View>

        );
    }
}