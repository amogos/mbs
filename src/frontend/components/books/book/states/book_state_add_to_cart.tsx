import React, { useState } from 'react';
import * as DataTypes from '../../../../../shared/types';
import IconText from '../../icon_text';
import { Button } from 'antd';
import * as Strings from '../../../../../shared/constants/string_constant';
import RentalSettingsComponent from '../rental_settings';

interface Props {
    book: DataTypes.BookRecordType;
    askBook(bookId: number, ownerId: number, duration: number): void;
}

const BookStateAddToCart = (param: Props) => {
    const [visible, setVisible] = useState(false);
    const { BookStateStrings } = Strings.default;
    return (
        <div>
            <Button
                type="link"
                onClick={() => {
                    setVisible(true);
                }}
            >
                <IconText type="shopping-cart" text={BookStateStrings.REQUEST_BOOK} />
            </Button>
            <RentalSettingsComponent
                visible={visible}
                onDurationChanged={(duration: number) => param.askBook(param.book.id, param.book.owner.id, duration)}
                onClosed={() => setVisible(false)}
            />
        </div>
    );
};

export default BookStateAddToCart;
