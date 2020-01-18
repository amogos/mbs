import React from 'react';
import * as DataTypes from '../../../shared/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

interface Props extends RouteComponentProps {
    userdata: DataTypes.UserRecordType;
    userRentedBooks: DataTypes.BookRecordType[];
    history: History;
}

const RentedBook = (props: Props, book: DataTypes.BookRecordType) => {
    const onBookmarkClicked = () => {
        props.history.push(`/book?id=${book.id}`);
    };

    return (
        <div className="rented_book" onClick={onBookmarkClicked}>
            <img height={64} src={book.image} alt="" />
            {book.title}
        </div>
    );
};

const ListRentedBooksComponent = (props: Props) => {
    if (props.userRentedBooks === undefined || props.userRentedBooks.length === 0) {
        return null;
    }

    return (
        <div className="list_rented_books_component">
            <div className="banner">
                <h2>RentedBooks</h2>
            </div>
            {React.Children.toArray(props.userRentedBooks.map(book => RentedBook(props, book)))}
        </div>
    );
};

export default withRouter(ListRentedBooksComponent);
