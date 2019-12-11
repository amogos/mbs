import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { withStyle } from '../../hooks/hooks';
import Book from './../../../containers/book_container';

interface Props {
    booksArray: DataTypes.BookRecordType[];
}

const ListBooksComponent = (props: Props) => {
    if (!props.booksArray) {
        return null;
    }

    return props.booksArray.map(item => <Book book={item} />);
};

export default withStyle(ListBooksComponent, 'list_book_component');
