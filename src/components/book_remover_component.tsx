import React from 'react'
import { Button } from 'react-native'
import * as DataTypes from "./../types";

interface Props {
    id: string;
    value: DataTypes.BookValueType;
    userdata: DataTypes.UserType;
    deleteBook(key: DataTypes.BookKeyType): void;
}

const BookRemover = (props: Props) => {
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

const onDeleteButtonPressed = (props: Props) => {
    var bookKey: DataTypes.BookKeyType = { id: props.id };
    props.deleteBook(bookKey);
}

export default BookRemover;