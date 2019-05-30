import React from 'react';
import { Button } from 'react-native';
import * as DataTypes from './../types';

interface Props {
    id: string | null;
    value: DataTypes.BookValueType;
    userdata: DataTypes.UserType;
    deleteBook(key: string | null): void;
}

const BookRemover: React.FunctionComponent<Props> = (props: Props) => {
    let content = null;
    var me: DataTypes.UserType = props.userdata;
    var book: DataTypes.BookValueType = props.value;
    let isMeOwner: boolean = me.email === book.owner.email;
    let isMeHolder: boolean = me.email === book.holder.email || book.holder.email === '';
    let bookKey: string | null = props.id;

    if (isMeOwner && isMeHolder)
        content = <Button title="delete" color="#000000ff" onPress={() => props.deleteBook(bookKey)} />;
    return content;
};

export default BookRemover;
