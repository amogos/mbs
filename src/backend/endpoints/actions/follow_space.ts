import axios from 'axios';
import { urlUsers } from '../constants';
import * as DataTypes from '../../../shared/types';

export async function followSpace(
    user: DataTypes.UserRecordType,
    spaceId: number,
    onCallback: () => void,
    onError: (resultCode: number) => void,
    onSuccess: () => void,
) {
    const uniqueFollowingSpaces = new Set([...user.following, spaceId]);
    const userRecordUpdate = { ...user, following: Array.from(uniqueFollowingSpaces) };

    await axios
        .put(`${urlUsers}/${user.id}`, userRecordUpdate)
        .then(() => {
            user.following = userRecordUpdate.following;
            onSuccess();
            if (onCallback) onCallback();
        })
        .catch(error => onError(error));
}

export async function unfollowSpace(
    user: DataTypes.UserRecordType,
    spaceId: number,
    onCallback: () => void,
    onError: (resultCode: number) => void,
    onSuccess: () => void,
) {
    let copyFollowingSpaces = user.following;
    copyFollowingSpaces = copyFollowingSpaces.filter(entry => entry !== spaceId);
    const userRecordUpdate = { ...user, following: Array.from(copyFollowingSpaces) };

    await axios
        .put(`${urlUsers}/${user.id}`, userRecordUpdate)
        .then(() => {
            user.following = userRecordUpdate.following;
            onSuccess();
            if (onCallback) onCallback();
        })
        .catch(error => onError(error));
}
