import React, { Component } from 'react'
import { Button } from 'react-native'

export default class BookRemover extends Component {
    constructor(props) {
        super(props);
        this.onDeletePressed = this.onDeletePressed.bind(this);
    }

    onDeletePressed() {
        let { context } = this.props;
        context.callbacks.onBookRemoved(this.props.key);
    }

    render() {
        let content = null;
        const { context, value } = this.props;

        if (context.userdata.email === value.owner.email && value.holder.email === "")
            content = (<Button title="delete" color="#000000ff"
                onPress={this.onDeletePressed} />);
        return content;
    }
}