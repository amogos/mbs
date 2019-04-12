import React from 'react'
import ShowAllBooksForm from './../forms/show_all_books_form'
import * as Types from "./../types";

interface Props {
    counter: number;
    userdata: Types.UserType;
    items: Types.BookRecordType[];
}
interface State {
}
export default class ShowAllBooksScreen extends React.Component<Props, State> {
    static screenId = 'search';
    render() {
        return (
            <ShowAllBooksForm {...this.props} />
        )
    }
}

