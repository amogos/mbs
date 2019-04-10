import React, { Component } from 'react'
import { Button } from 'react-native'
import EventBus from './../utils/event_bus'

export default class BookRemover extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onDeleteButtonPressed = this.onDeleteButtonPressed.bind(this);
    }
    onDeleteButtonPressed() {
        EventBus.getInstance().fireEvent("onBookRemoved", { param: this.props.id })
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