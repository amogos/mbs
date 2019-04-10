import React from 'react';
import AddNewBookForm from './../forms/add_new_book_form';

export default class AddNewBookScreen extends React.Component<any, any> {
    static screenId = "add";
    
    render() {
        return (
            <AddNewBookForm {...this.props}/>
        );
    }
}