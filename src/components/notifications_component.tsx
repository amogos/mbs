import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';

interface Props {
    notifications: DataTypes.RentalNotificationRecordType[];
    confirmRental(rental: DataTypes.RentalNotificationRecordType): void;
    rejectRental(rental: DataTypes.RentalNotificationRecordType): void;
    getReturns(callback: (returns: DataTypes.ReturnNotificationType[]) => void): void;
}

interface Notification {
    actions: React.ReactNode[];
    title: string | undefined;
    avatar: string;
    description: string;
}

interface State {
    returnNotifications: Notification[];
}

const emptyState: State = { returnNotifications: [] };

const NotificationComponent = (props: Props) => {
    const [notifications, setNotifications] = useState(emptyState);

    const confirmRental = (rental: DataTypes.RentalNotificationRecordType) => {
        props.confirmRental(rental);
    };

    const rejectRental = (rental: DataTypes.RentalNotificationRecordType) => {
        props.rejectRental(rental);
    };

    const rateReturn = (bookId: number) => {};

    const onReturnsReceived = (returns: DataTypes.ReturnNotificationType[]) => {
        let returnsNotifications: Notification[] = [];

        returns.forEach(item => {
            returnsNotifications.push({
                actions: [<a onClick={() => rateReturn(item.bookId)}>rate</a>],
                title: item.user.name,
                avatar: item.user.picture,
                description: item.bookTitle,
            });
        });

        let state = { ...notifications };
        state.returnNotifications = returnsNotifications;
        setNotifications(state);
    };

    if (notifications === emptyState) {
        props.getReturns(onReturnsReceived);
    }

    alert(JSON.stringify(notifications));

    return (
        <div>
            <List
                dataSource={notifications.returnNotifications}
                bordered
                renderItem={item => (
                    <List.Item actions={item.actions}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href="https://ant.design/index-cn">{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationComponent;
