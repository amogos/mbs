import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';
import RatingComponent from './../components/rating_component';

interface Props {
    userdata: DataTypes.UserRecordType;
    rateReturn(
        returnId: number,
        bookId: number,
        user: DataTypes.UserRecordType,
        state: number,
        comment: string,
        callback: () => void,
    ): void;
    confirmRental(rental: DataTypes.QueueNotificationRecordType, callback: () => void): void;
    rejectRental(rental: DataTypes.QueueNotificationRecordType, callback: () => void): void;
    getReturns(callback: (returns: DataTypes.ReturnNotificationType[]) => void): void;
    getQueue(callback: (returns: DataTypes.QueueNotificationRecordType[]) => void): void;
}

interface Notification {
    actions: React.ReactNode[];
    title: string | undefined;
    avatar: string;
    description: string;
    key: string;
}

interface Selection {
    showRating: boolean;
    bookId: number;
    returnId: number;
    user: DataTypes.UserRecordType;
}

const NotificationComponent = (props: Props) => {
    const emptyState: Notification[] = [];

    const emptySelection: Selection = {
        returnId: 0,
        user: DataTypes.NullUser,
        bookId: 0,
        showRating: false,
    };

    const [notifications, setNotifications] = useState(emptyState);
    const [selection, setSelection] = useState(emptySelection);

    const resolveNotification = (removeKey: string) => {
        const leftNotifications = notifications.filter(item => item.key !== removeKey);
        setNotifications(leftNotifications);
    };

    const confirmRental = (queueElement: DataTypes.QueueNotificationRecordType) => {
        props.confirmRental(queueElement, () => resolveNotification(`q${queueElement.id}`));
    };

    const rejectRental = (queueElement: DataTypes.QueueNotificationRecordType) => {
        props.rejectRental(queueElement, () => resolveNotification(`q${queueElement.id}`));
    };

    const rateReturn = (returnElement: DataTypes.ReturnNotificationType) => {
        const selection: Selection = {
            returnId: returnElement.returnId,
            user: returnElement.user,
            bookId: returnElement.bookId,
            showRating: true,
        };
        setSelection(selection);
    };

    const onRatingCanceled = () => {
        setSelection(emptySelection);
    };

    const onQueueReceived = (queue: DataTypes.QueueNotificationRecordType[]) => {
        let queueNotifications: Notification[] = notifications;
        queue.forEach(item => {
            queueNotifications.push({
                actions: [
                    <a onClick={() => rejectRental(item)}>reject</a>,
                    <a onClick={() => confirmRental(item)}>confirm</a>,
                ],
                title: item.user.name,
                avatar: item.user.picture,
                description: item.bookTitle,
                key: `q${item.id}`,
            });
        });

        let state = [...notifications];
        setNotifications(state);
    };

    const onReturnsReceived = (returns: DataTypes.ReturnNotificationType[]) => {
        let returnsNotifications: Notification[] = notifications;
        returns.forEach(item => {
            returnsNotifications.push({
                actions: [<a onClick={() => rateReturn(item)}>rate</a>],
                title: item.user.name,
                avatar: item.user.picture,
                description: item.bookTitle,
                key: `r${item.returnId}`,
            });
        });

        let state = [...notifications];
        setNotifications(state);
    };

    const onRatingOk = (_content: number, state: number, commment: string) => {
        props.rateReturn(selection.returnId, selection.bookId, selection.user, state, commment, () =>
            resolveNotification(`r${selection.returnId}`),
        );
        setSelection(emptySelection);
    };

    const loadNotifications = () => {
        props.getReturns(onReturnsReceived);
        props.getQueue(onQueueReceived);
    };

    if (notifications === emptyState) {
        loadNotifications();
    }

    return (
        <div>
            <List
                dataSource={notifications}
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
            <RatingComponent
                visible={selection.showRating}
                rateState={true}
                rateContent={false}
                userdata={selection.user}
                onOk={(contentRating: number, stateRating: number, comment: string) =>
                    onRatingOk(contentRating, stateRating, comment)
                }
                onClosed={onRatingCanceled}
            />
        </div>
    );
};

export default NotificationComponent;
