import React, { useState } from 'react';
import * as DataTypes from '../../../../shared/types';
import IconText from './icon_text';
import { Button } from 'antd';
import * as Strings from './../../../../shared/constants/string_constant';
import RentalSettings from './../../book/rental_settings';
import BookAvailability from './../book_availability';

interface Props {
    book: DataTypes.BookRecordType;
    askBook(bookId: number, ownerId: number, duration: number): void;
}

const BookStateAddToCart = (param: Props) => {
    const [visible, setVisible] = useState(false);
    const { BookStateStrings } = Strings.default;
    const showBookAvailability = param.book.holder.id > 0 && param.book.return && Date.now() < param.book.return;

    return (
        <div>
            <Button
                onClick={() => {
                    setVisible(true);
                }}
            >
                <IconText type="shopping-cart" text={BookStateStrings.REQUEST_BOOK} />
            </Button>
            {showBookAvailability ? <BookAvailability book={param.book} /> : null}
            <RentalSettings
                visible={visible}
                onDurationChanged={(duration: number) => param.askBook(param.book.id, param.book.owner.id, duration)}
                onClosed={() => setVisible(false)}
            />
        </div>
    );
};

export default BookStateAddToCart;
