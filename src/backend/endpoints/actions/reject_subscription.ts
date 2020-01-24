import * as DataTypes from '../../../shared/types';
import * as UserEndpoint from './../user';
import * as SpaceEndpoint from './../spaces';

export async function rejectSubscription(
    subscription: DataTypes.SubscribeNotificationType,
    callback: () => void,
    onError: (resultCode: number) => void,
): Promise<void> {
    const user = subscription.user;
    const space = subscription.space;
    user.pendingSubscriptions = user.pendingSubscriptions.filter(item => item !== subscription.space.id);
    space.pendingUsers = space.pendingUsers.filter(item => item != user.id);
    await UserEndpoint.updateUser(user, onError);
    await SpaceEndpoint.updateSpace(space, onError);
}
