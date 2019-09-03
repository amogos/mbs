import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';
import RatingComponent from './../components/rating_component';

interface Props {
    userdata: DataTypes.UserRecordType;
    rateReturn(returnId: number, bookId: number, user: DataTypes.UserRecordType, state: number, comment: string): void;
    confirmRental(rental: DataTypes.QueueNotificationRecordType): void;
    rejectRental(rental: DataTypes.QueueNotificationRecordType): void;
    getReturns(callback: (returns: DataTypes.ReturnNotificationType[]) => void): void;
    getQueue(callback: (returns: DataTypes.QueueNotificationRecordType[]) => void): void;
}

interface Notification {
    actions: React.ReactNode[];
    title: string | undefined;
    avatar: string;
    description: string;
}

const NotificationComponent = (props: Props) => {
    const emptyState: Notification[] = [];
    const [notifications, setNotifications] = useState(emptyState);
    const [showRating, setShowRating] = useState(false);
    const [bookId, setBookId] = useState(0);
    const [returnId, setReturnId] = useState(0);
    const [user, setUser] = useState(DataTypes.NullUser);

    const confirmRental = (queueElement: DataTypes.QueueNotificationRecordType) => {
        props.confirmRental(queueElement);
    };

    const rejectRental = (queueElement: DataTypes.QueueNotificationRecordType) => {
        props.rejectRental(queueElement);
    };

    const rateReturn = (returnElement: DataTypes.ReturnNotificationType) => {
        setReturnId(returnElement.returnId);
        setUser(returnElement.user);
        setBookId(returnElement.bookId);
        setShowRating(true);
    };

    const onRatingCanceled = () => {
        setShowRating(false);
        setBookId(0);
    };

    const onRatingOk = (content: number, state: number, commment: string) => {
        props.rateReturn(returnId, bookId, user, state, commment);
        setShowRating(false);
        setBookId(0);
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
            });
        });

        let state = [...notifications];
        setNotifications(state);
    };

    if (notifications === emptyState) {
        props.getReturns(onReturnsReceived);
        props.getQueue(onQueueReceived);
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
                visible={showRating}
                rateState={true}
                rateContent={false}
                userdata={user}
                onOk={(contentRating: number, stateRating: number, comment: string) =>
                    onRatingOk(contentRating, stateRating, comment)
                }
                onClosed={onRatingCanceled}
            />
        </div>
    );
};

export default NotificationComponent;
