import React from 'react';
import IconText from '../../icon_text';
import * as Strings from '../../../../../shared/constants/string_constant';

const BookStateAssigned = () => {
    const { BookStateStrings } = Strings.default;
    return <IconText type="hourglass" text={BookStateStrings.ASSIGNED_BOOK} />;
};

export default BookStateAssigned;
