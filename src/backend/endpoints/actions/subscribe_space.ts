import * as DataTypes from './../../../shared/types';
import { updateUser } from './../user';
import { updateSpace } from './../spaces';

export async function subscribeSpace(
    user: DataTypes.UserRecordType,
    space: DataTypes.SpaceType,
    onError: (resultCode: number) => void,
    onSuccess?: () => void,
    onFail?: () => void,
) {
    user.pendingSubscriptions.push(space.id);
    space.pendingUsers.push(user.id);

    let nSucceededSteps = 0;

    await updateUser(user, onError, () => nSucceededSteps++);
    await updateSpace(space, onError, () => nSucceededSteps++);

    if (nSucceededSteps < 2) {
        if (onFail) onFail();
    } else if (onSuccess) {
        onSuccess();
    }
}

export async function unsubscribeSpace(
    user: DataTypes.UserRecordType,
    space: DataTypes.SpaceType,
    onError: (resultCode: number) => void,
    onSuccess?: () => void,
    onFail?: () => void,
) {
    user.subscriptions = user.subscriptions.filter((spaceId: number) => spaceId == space.id);
    space.subscribedUsers = space.subscribedUsers.filter((userId: number) => userId == user.id);
    await updateUser(user, onError, onSuccess);
    await updateSpace(space, onError, onSuccess);
}
