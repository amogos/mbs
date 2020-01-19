import React from 'react';
import * as DataTypes from '../../../shared/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { requiresCondition } from '../hooks/hooks';
import { History } from 'history';
import { Progress } from 'antd';
import { OneDayMilliseconds } from './../../../shared/constants/time_constant';

interface Props extends RouteComponentProps {
    userdata: DataTypes.UserRecordType;
    userRentedBooks: DataTypes.BookRecordType[];
    history: History;
}

const RentedBook = (props: Props, book: DataTypes.BookRecordType) => {
    let percent = 100;
    let elapsedDurationInDays = 0;

    if (book.requestdate && book.returndate && Date.now() < book.returndate) {
        const rentalDurationInDays = Math.round((book.returndate - book.requestdate) / OneDayMilliseconds);

        elapsedDurationInDays = (Date.now() - book.requestdate) / OneDayMilliseconds;
        alert(elapsedDurationInDays);
        percent = (100 * elapsedDurationInDays) / rentalDurationInDays;
    }
    return (
        <div className="rented_book" onClick={() => props.history.push(`/book?id=${book.id}`)}>
            <img height={64} src={book.image} alt="" />
            {book.title}
            <Progress
                type="circle"
                percent={percent}
                format={elapsedDurationInDays => `${elapsedDurationInDays} Days`}
            />
        </div>
    );
};

const ListRentedBooksComponent = (props: Props) => {
    return (
        <div className="list_rented_books_component">
            <div className="banner">
                <h2>RentedBooks</h2>
            </div>
            {React.Children.toArray(props.userRentedBooks.map(book => RentedBook(props, book)))}
        </div>
    );
};

const validateProps = (props: Props) => {
    return props.userRentedBooks && props.userRentedBooks.length > 0;
};

export default withRouter(requiresCondition(ListRentedBooksComponent, (props: Props) => validateProps(props)));
