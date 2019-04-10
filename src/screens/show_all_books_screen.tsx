import React from 'react'
import ShowAllBooksForm from './../forms/show_all_books_form'

export default class ShowAllBooksScreen extends React.Component<any, any> {
    static screenId = 'search';
    render() {
        return (
           <ShowAllBooksForm {...this.props}/>
        )
    }
}

