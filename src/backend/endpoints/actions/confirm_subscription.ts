import * as DataTypes from '../../../shared/types';
import * as UserEndpoint from './../user';
import * as SpaceEndpoint from './../spaces';
import { handleError } from '../../../frontend/reducers/main_reducer';

export async function confirmSubscription(
    notification: DataTypes.AppNotification,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<void> {
    const subscription = notification as DataTypes.JoinSpaceRequest;
    const user = await UserEndpoint.getUserRecordTypeFromId(
        subscription.type === DataTypes.NotificationType.JOIN_SPACE_INVITE
            ? subscription.toUserId
            : subscription.fromUserId,
        onError,
    );
    const space = await SpaceEndpoint.getSpaceTypeFromId(subscription.spaceId, handleError);
    user.pendingSubscriptions = user.pendingSubscriptions.filter(item => item !== subscription.spaceId);
    user.subscriptions.push(space.id);
    space.pendingUsers = space.pendingUsers.filter(item => item != user.id);
    space.subscribedUsers.push(user.id);
    await UserEndpoint.updateUser(user, onError);
    await SpaceEndpoint.updateSpace(space, onError);
}
