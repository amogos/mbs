import React, { useState } from 'react';
import { List, Avatar, Divider, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import RatingComponent from '../rating/rating';
import { Aux, withStyle } from './../hooks/hooks';
import { UserRecordType, AppNotification } from '../../../shared/types';

interface Props {
    userdata: DataTypes.UserRecordType;
    notifications: DataTypes.AppNotification[];

    rateReturn(
        returnId: number,
        bookId: number,
        user: DataTypes.UserRecordType,
        state: number,
        comment: string,
        callback: () => void,
    ): void;
    confirmRental(rental: DataTypes.AppNotification, callback: () => void): void;
    rejectRental(rental: DataTypes.AppNotification, callback: () => void): void;
    //  getReturns(callback: (returns: DataTypes.ReturnNotificationType[]) => void): void;
    //   getQueue(callback: (returns: DataTypes.QueueNotificationType[]) => void): void;
    //  getPendingSubscribersForUser(
    //     userId: number,
    //      callback: (subscribers: DataTypes.SubscribeNotificationType[]) => void,
    // ): void;
    confirmSubscription(subscription: AppNotification, callback: () => void): void;
    rejectSubscription(subscription: AppNotification, callback: () => void): void;
}

interface NotificationView {
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

const emptyState: NotificationView[] = [];

const emptySelection: Selection = {
    returnId: 0,
    user: DataTypes.NullUserRecordType(),
    bookId: 0,
    showRating: false,
};

const NotificationsComponent = (props: Props) => {
    const [notificationViews, setNotificationViews] = useState(emptyState);
    const [selection, setSelection] = useState(emptySelection);

    const resolveNotification = (removeKey: string) => {
        const leftNotifications = notificationViews.filter(item => item.key !== removeKey);
        setNotificationViews(leftNotifications);
    };

    const confirmRental = (queueElement: DataTypes.AppNotification) => {
        props.confirmRental(queueElement, () => resolveNotification(`q${queueElement.id}`));
    };

    const rejectRental = (queueElement: DataTypes.AppNotification) => {
        props.rejectRental(queueElement, () => resolveNotification(`q${queueElement.id}`));
    };

    const rateReturn = (returnElement: DataTypes.ReturnBookNotification) => {
        const selection: Selection = {
            returnId: returnElement.id ? returnElement.id : 0,
            user: returnElement.fromUser ? returnElement.fromUser : DataTypes.NullUserRecordType(),
            bookId: returnElement.bookId,
            showRating: true,
        };
        setSelection(selection);
    };

    const onRatingCanceled = () => {
        setSelection(emptySelection);
    };

    /*const onQueueReceived = (queue: DataTypes.QueueNotificationType[]) => {
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
    };*/

    const confirmSubscription = (notification: DataTypes.AppNotification) => {
        const subscription = notification as DataTypes.JoinSpaceRequest;
        const userId =
            notification.type === DataTypes.NotificationType.JOIN_SPACE_INVITE
                ? notification.toUserId
                : notification.fromUserId;
        props.confirmSubscription(subscription, () => resolveNotification(`s${subscription.spaceId}${userId}`));
    };

    const rejectSubscription = (notification: DataTypes.AppNotification) => {
        const subscription = notification as DataTypes.JoinSpaceRequest;
        const userId =
            notification.type === DataTypes.NotificationType.JOIN_SPACE_INVITE
                ? notification.toUserId
                : notification.fromUserId;
        props.rejectSubscription(subscription, () => resolveNotification(`s${subscription.spaceId}${userId}`));
    };

    /* const onSubscribersReceived = (subscribeNotifications: DataTypes.SubscribeNotificationType[]) => {
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
    };*/

    /* const onReturnsReceived = (returns: DataTypes.ReturnNotificationType[]) => {
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
    };*/

    const onRatingOk = (_content: number, state: number, commment: string) => {
        props.rateReturn(selection.returnId, selection.bookId, selection.user, state, commment, () =>
            resolveNotification(`r${selection.returnId}`),
        );
        setSelection(emptySelection);
    };

    const buildView = (notification: DataTypes.AppNotification): NotificationView => {
        if (notification.type === DataTypes.NotificationType.REQUEST_BOOK) {
            const requestBook = notification as DataTypes.RequestBookNotification;
            return {
                actions: [
                    <Button type="link" onClick={() => rejectRental(notification)}>
                        reject
                    </Button>,
                    <Button type="link" onClick={() => confirmRental(notification)}>
                        confirm
                    </Button>,
                ],
                title: requestBook.fromUser ? requestBook.fromUser.name : '',
                avatar: requestBook.fromUser ? requestBook.fromUser.picture : '',
                rating: requestBook.fromUser ? requestBook.fromUser.rating : 0,
                description: requestBook.book?.title as string,
                key: `q${requestBook.id}`,
            };
        } else if (notification.type === DataTypes.NotificationType.RETURN_BOOK) {
            const returnBook = notification as DataTypes.RequestBookNotification;
            return {
                actions: [
                    <Button type="link" onClick={() => rateReturn(returnBook)}>
                        rate
                    </Button>,
                ],
                title: returnBook.fromUser ? returnBook.fromUser.name : '',
                avatar: returnBook.fromUser ? returnBook.fromUser.picture : '',
                rating: returnBook.fromUser ? returnBook.fromUser.rating : 0,
                description: returnBook.book ? returnBook.book.title : '',
                key: `r${returnBook.id}`,
            };
        } else if (notification.type === DataTypes.NotificationType.JOIN_SPACE_REQUEST) {
            const joinSpace = notification as DataTypes.JoinSpaceRequest;
            const user =
                joinSpace.type === DataTypes.NotificationType.JOIN_SPACE_INVITE
                    ? (notification.fromUser as UserRecordType)
                    : (notification.toUser as UserRecordType);
            const space = joinSpace.space as DataTypes.SpaceType;
            let description = `requested space ${space.title} subscription`;
            if (joinSpace.type === DataTypes.NotificationType.JOIN_SPACE_INVITE) {
                description = `invited you to join space ${space.title} `;
            }
            return {
                actions: [
                    <Button type="link" onClick={() => rejectSubscription(notification)}>
                        reject
                    </Button>,
                    <Button type="link" onClick={() => confirmSubscription(notification)}>
                        confirm
                    </Button>,
                ],
                title: user.name,
                avatar: user.picture,
                rating: user.rating,
                description: description,
                key: `s${space.id}${user.id}`,
            };
        }
        return { actions: [], title: '', avatar: '', rating: 0, description: '', key: '' };
    };

    const loadNotifications = () => {
        props.notifications.forEach(notification => notificationViews.push(buildView(notification)));
    };

    if (notificationViews === emptyState) {
        loadNotifications();
    }

    const NotificationView = (item: NotificationView) => {
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
            <List dataSource={notificationViews} renderItem={item => NotificationView(item)} />
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
