import React from 'react';
import { Comment, Avatar } from 'antd';
import * as DataTypes from '../../../shared/types';
import { CustomDate } from './../../../shared/utils/CustomDate';

const BookFeedItem = (props: { item: DataTypes.UserFeedRecordType }) => {
    const { item } = props;
    const title = `${item.user.name} ${new CustomDate(item.date).toString()}`;
    return (
        <Comment
            author={<a>{title}</a>}
            avatar={<Avatar src={item.user.picture} alt={item.user.name} />}
            content={
                <p>
                    {DataTypes.UserFeedTypeToString(item.type)}:{' '}
                    {item.bookDescription ? item.bookDescription.title : ''}
                </p>
            }
        />
    );
};

export default BookFeedItem;
