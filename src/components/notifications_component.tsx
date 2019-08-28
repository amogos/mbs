import React from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';

interface Props {
    notifications: DataTypes.RentalNotificationRecordType[];
    confirmRental(rental: DataTypes.RentalNotificationRecordType): void;
    rejectRental(rental: DataTypes.RentalNotificationRecordType): void;
}

const NotificationComponent = (props: Props) => {
    const confirmRental = (rental: DataTypes.RentalNotificationRecordType) => {
        props.confirmRental(rental);
    };

    const rejectRental = (rental: DataTypes.RentalNotificationRecordType) => {
        props.rejectRental(rental);
    };

    return (
        <div>
            <List
                dataSource={props.notifications}
                bordered
                renderItem={item => (
                    <List.Item
                        actions={[
                            <a onClick={() => confirmRental(item)}>confirm</a>,
                            <a onClick={() => rejectRental(item)}>reject</a>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            }
                            title={<a href="https://ant.design/index-cn">{item.user.name}</a>}
                            description={item.bookTitle}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationComponent;
