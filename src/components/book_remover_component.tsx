import React from 'react';
import { Button } from 'react-native';
import * as DataTypes from './../types';
import * as BookStates from './../book_states';

interface Props {
    id: number;
    value: DataTypes.BookValueType;
    userdata: DataTypes.UserRecordType;
    deleteBook(key: number): void;
}

const BookRemover: React.FunctionComponent<Props> = (props: Props) => {
    let content = null;
    var me: DataTypes.UserRecordType = props.userdata;
    var book: DataTypes.BookValueType = props.value;
    let bookKey: number = props.id;
    let isMeOwner: boolean = me.value.email === book.owner.value.email;
    let isMeHolder: boolean = book.state === BookStates.default.STATE_BOOK_IDLE;

    if (isMeOwner && isMeHolder)
        content = <Button title="delete" color="#000000ff" onPress={() => props.deleteBook(bookKey)} />;
    return content;
};

export default BookRemover;
