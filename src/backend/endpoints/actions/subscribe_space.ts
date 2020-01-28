import * as DataTypes from './../../../shared/types';
import { updateUser } from './../user';
import { updateSpace, getSpace } from './../spaces';
import { handleError } from '../../../frontend/reducers/main_reducer';

export async function subscribeSpace(
    user: DataTypes.UserRecordType,
    spaceId: number,
    onError: (resultCode: number) => void,
    onSuccess?: () => void,
    onFail?: () => void,
) {
    const space = await getSpace(spaceId, handleError);
    user.pendingSubscriptions.push(space.id);
    space.pendingUsers.push(user.id);
    await updateUser(user, onError, onSuccess, onFail);
    await updateSpace(space, onError, onSuccess, onFail);
}

export async function unsubscribeSpace(
    user: DataTypes.UserRecordType,
    spaceId: number,
    onError: (resultCode: number) => void,
    onSuccess?: () => void,
    onFail?: () => void,
) {
    const space = await getSpace(spaceId, handleError);
    user.subscriptions = user.subscriptions.filter((spaceId: number) => spaceId == space.id);
    space.subscribedUsers = space.subscribedUsers.filter((userId: number) => userId == user.id);
    await updateUser(user, onError, onSuccess, onFail);
    await updateSpace(space, onError, onSuccess, onFail);
}
