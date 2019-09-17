import React from 'react';
import * as DataTypes from '../../types';
import { Icon, Badge, Tag } from 'antd';
import Moment from 'react-moment';

interface Props {
    book: DataTypes.BookValueType;
}

const BookAvailabilityDate = (props: Props) => {
    if (props.book.return && Date.now() < props.book.return)
        return (
            <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
                <Tag color="red">
                    <Moment format="YYYY/MM/DD" date={new Date(props.book.return)} />
                </Tag>
            </Badge>
        );
    return null;
};

export default BookAvailabilityDate;
