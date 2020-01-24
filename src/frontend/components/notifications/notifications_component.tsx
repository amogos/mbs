import React, { useState } from 'react';
import { List, Avatar, Divider, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import RatingComponent from '../rating/rating';
import { Aux, withStyle } from './../hooks/hooks';
import { UserRecordType } from '../../../shared/types';

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
    confirmRental(rental: DataTypes.QueueNotificationType, callback: () => void): void;
    rejectRental(rental: DataTypes.QueueNotificationType, callback: () => void): void;
    getReturns(callback: (returns: DataTypes.ReturnNotificationType[]) => void): void;
    getQueue(callback: (returns: DataTypes.QueueNotificationType[]) => void): void;
    getPendingSubscribersForUser(
        userId: number,
        callback: (subscribers: DataTypes.SubscribeNotificationType[]) => void,
    ): void;
    confirmSubscription(subscription: DataTypes.SubscribeNotificationType, callback: () => void): void;
    rejectSubscription(subscription: DataTypes.SubscribeNotificationType, callback: () => void): void;
}

interface Notification {
    actions: React.ReactNode[];
    title: string | undefined;
    avatar: string;
    rating: number;
    description: string;
    key: string;
}

interface Selection {
    showRating: boolean;
    bookId: number;
    returnId: number;
    user: DataTypes.UserRecordType;
}

const emptyState: Notification[] = [];

const emptySelection: Selection = {
    returnId: 0,
    user: DataTypes.NullUserRecordType(),
    bookId: 0,
    showRating: false,
};

const NotificationsComponent = (props: Props) => {
    const [notifications, setNotifications] = useState(emptyState);
    const [selection, setSelection] = useState(emptySelection);

    const resolveNotification = (removeKey: string) => {
        const leftNotifications = notifications.filter(item => item.key !== removeKey);
        setNotifications(leftNotifications);
    };

    const confirmRental = (queueElement: DataTypes.QueueNotificationType) => {
        props.confirmRental(queueElement, () => resolveNotification(`q${queueElement.id}`));
    };

    const rejectRental = (queueElement: DataTypes.QueueNotificationType) => {
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

    const onQueueReceived = (queue: DataTypes.QueueNotificationType[]) => {
        const queueNotifications: Notification[] = notifications;
        queue.forEach(item => {
            queueNotifications.push({
                actions: [
                    <Button type="link" onClick={() => rejectRental(item)}>
                        reject
                    </Button>,
                    <Button type="link" onClick={() => confirmRental(item)}>
                        confirm
                    </Button>,
                ],
                title: item.user.name,
                avatar: item.user.picture,
                rating: item.user.rating,
                description: item.bookTitle,
                key: `q${item.id}`,
            });
        });

        const state = [...notifications];
        setNotifications(state);
    };

    const confirmSubscription = (subscription: DataTypes.SubscribeNotificationType) => {
        props.confirmSubscription(subscription, () =>
            resolveNotification(`s${subscription.space.id}${subscription.user.id}`),
        );
    };

    const rejectSubscription = (subscription: DataTypes.SubscribeNotificationType) => {
        props.rejectSubscription(subscription, () =>
            resolveNotification(`s${subscription.space.id}${subscription.user.id}`),
        );
    };

    const onSubscribersReceived = (subscribeNotifications: DataTypes.SubscribeNotificationType[]) => {
        const subscriptionNotifications: Notification[] = notifications;

        subscribeNotifications.forEach(item => {
            subscriptionNotifications.push({
                actions: [
                    <Button type="link" onClick={() => rejectSubscription(item)}>
                        reject
                    </Button>,
                    <Button type="link" onClick={() => confirmSubscription(item)}>
                        confirm
                    </Button>,
                ],
                title: item.user.name,
                avatar: item.user.picture,
                rating: item.user.rating,
                description: `requested space ${item.space.id} subscription`,
                key: `s${item.space.id}${item.user.id}`,
            });
        });

        const state = [...notifications];
        setNotifications(state);
    };

    const onReturnsReceived = (returns: DataTypes.ReturnNotificationType[]) => {
        const returnsNotifications: Notification[] = notifications;
        returns.forEach(item => {
            returnsNotifications.push({
                actions: [
                    <Button type="link" onClick={() => rateReturn(item)}>
                        rate
                    </Button>,
                ],
                title: item.user.name,
                avatar: item.user.picture,
                rating: item.user.rating,
                description: item.bookTitle,
                key: `r${item.returnId}`,
            });
        });

        const state = [...notifications];
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
        props.getPendingSubscribersForUser(props.userdata.id, onSubscribersReceived);
    };

    if (notifications === emptyState) {
        loadNotifications();
    }

    const NotificationItem = (item: Notification) => {
        return (
            <Aux>
                <div className="notification_item">
                    <div>
                        <div>
                            <Avatar src={item.avatar} />
                        </div>
                        <div>
                            {item.title} ({item.rating.toFixed(1)})
                        </div>
                    </div>
                    <div>{item.description}</div>
                </div>
                <div className="notification_actions">
                    <div />
                    {React.Children.toArray(item.actions.map(action => <div>{action}</div>))}
                </div>
                <Divider />
            </Aux>
        );
    };

    return (
        <div>
            <List dataSource={notifications} renderItem={item => NotificationItem(item)} />
            <RatingComponent
                visible={selection.showRating}
                rateState={true}
                rateContent={false}
                avatar_picture={selection.user.picture}
                onOk={(contentRating: number, stateRating: number, comment: string) =>
                    onRatingOk(contentRating, stateRating, comment)
                }
                onClosed={onRatingCanceled}
            />
        </div>
    );
};

export default withStyle(NotificationsComponent, 'notification_component');
