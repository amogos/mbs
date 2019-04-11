import React from 'react';
import AddNewBookForm from './../forms/add_new_book_form';
import * as Types from "./../types";

interface Props {
    userdata: Types.UserType;
}
interface State {
}

export default class AddNewBookScreen extends React.Component<Props, State> {
    static screenId = "add";

    render() {
        return (
            <AddNewBookForm userdata={this.props.userdata} />
        );
    }
}