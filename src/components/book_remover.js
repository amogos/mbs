import React, { Component } from 'react'
import { Button } from 'react-native'

export default class BookRemover extends Component {
    render() {
        let content = null;
        const { userdata, holder, owner } = this.props;
        if (userdata.email === owner.email && holder.email === "")
            content = (<Button title="delete" color="#000000ff"
                onPress={this.props.callbacks.onBookRemoved} />);
        return content;
    }
}