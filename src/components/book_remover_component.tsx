import React from 'react'
import { Button } from 'react-native'
import EventBus from './../utils/event_bus'
import * as DataTypes from "./../types";


const onDeleteButtonPressed = (props: any) => {
    var bookKey: DataTypes.BookKeyType = { id: props.id };
    props.deleteBook(bookKey);
}

const BookRemover = (props: any) => {
    let content = null;
    var me: DataTypes.UserType = props.userdata;
    var book: DataTypes.BookValueType = props.value;
    let isMeOwner: boolean = me.email === book.owner.email;
    let isMeHolder: boolean = me.email === book.holder.email || book.holder.email === "";

    if (isMeOwner && isMeHolder)
        content = (<Button title="delete" color="#000000ff"
            onPress={() => onDeleteButtonPressed(props)} />);
    return content;
}

export default BookRemover;