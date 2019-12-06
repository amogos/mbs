import React from 'react';
import * as DataTypes from '../../../../../shared/types';
import { Icon, Badge, Tag } from 'antd';
import Moment from 'react-moment';

interface Props {
    book: DataTypes.BookRecordType;
}

const BookAvailabilityDate = (props: Props) => {
    const shouldBeVisible = props.book.holder.id > 0 && props.book.return && Date.now() < props.book.return;

    if (shouldBeVisible)
        return (
            <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
                <Tag color="red">
                    <Moment format="YYYY/MM/DD" date={props.book.return ? new Date(props.book.return) : new Date()} />
                </Tag>
            </Badge>
        );
    return null;
};

export default BookAvailabilityDate;