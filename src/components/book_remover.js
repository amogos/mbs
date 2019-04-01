import React, { Component } from 'react'
import { Button } from 'react-native'

export default class BookRemover extends Component {
    constructor(props) {
        super(props);
        this.onDeleteButtonPressed = this.onDeleteButtonPressed.bind(this);
    }
    onDeleteButtonPressed() {
        this.props.callbacks.onBookRemoved(this.props.id);
    }
    render() {
        let content = null;
        const { userdata } = this.props;
        const owner = this.props.value.owner;
        const holder = this.props.value.holder;

        if (userdata.email === owner.email && holder.email === "")
            content = (<Button title="delete" color="#000000ff"
                onPress={this.onDeleteButtonPressed} />);
        return content;
    }
}