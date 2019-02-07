import React, { Component } from 'react'
import ShowAllBooksForm from '../forms/show_all_books_form.js'

export default class ShowAllBooksScreen extends Component {
    static screenId = 'search';
    render() {
        return (
           <ShowAllBooksForm {...this.props}/>
        )
    }
}

