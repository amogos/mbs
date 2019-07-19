import React from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';

interface Props {
    notifications: DataTypes.RentalNotificationRecordType[];
    confirmRental(key: number, user: DataTypes.UserRecordType): void;
    rejectRental(key: number, user: DataTypes.UserRecordType): void;
}

const NotificationComponent = (props: Props) => {
    const confirmRental = (key: number, user: DataTypes.UserRecordType) => {
        props.confirmRental(key, user);
    };

    const rejectRental = (key: number, user: DataTypes.UserRecordType) => {
        props.rejectRental(key, user);
    };

    return (
        <div>
            <List
                dataSource={props.notifications}
                bordered
                renderItem={item => (
                    <List.Item
                        actions={[
                            <a onClick={() => confirmRental(item.bookId, item.value.user)}>confirm</a>,
                            <a onClick={() => rejectRental(item.bookId, item.value.user)}>reject</a>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            }
                            title={<a href="https://ant.design/index-cn">{item.value.user.value.name}</a>}
                            description={item.value.bookTitle}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationComponent;
