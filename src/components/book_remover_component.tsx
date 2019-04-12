import React, { Component } from 'react'
import { Button } from 'react-native'
import EventBus from './../utils/event_bus'
import * as Types from "./../types";

interface Props {
    id: string | null;
    value: Types.BookValueType;
    userdata: Types.UserType;
}
interface State {
}

export default class BookRemover extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onDeleteButtonPressed = this.onDeleteButtonPressed.bind(this);
    }
    onDeleteButtonPressed() {
        var bookKey: Types.BookKeyType = { id: this.props.id };
        EventBus.getInstance().fireEvent("onBookRemoved", bookKey)
    }
    render() {
        let content = null;
        var me: Types.UserType = this.props.userdata;
        var book: Types.BookValueType = this.props.value;
        let isMeOwner: boolean = me.email === book.owner.email;
        let isMeHolder: boolean = me.email === book.holder.email || book.holder.email === "";

        if (isMeOwner && isMeHolder)
            content = (<Button title="delete" color="#000000ff"
                onPress={this.onDeleteButtonPressed} />);
        return content;
    }
}