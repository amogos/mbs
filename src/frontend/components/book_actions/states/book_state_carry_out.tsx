import React from 'react';
import IconText from './icon_text';
import * as Strings from '../../../../shared/constants/string_constant';

const BookStateCarryOut = () => {
    const { BookStateStrings } = Strings.default;
    return <IconText type="carry-out" text={BookStateStrings.PENDING_BOOK} />;
};

export default BookStateCarryOut;
