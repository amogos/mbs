import axios from 'axios';
import { urlUsers } from '../constants';
import * as DataTypes from '../../../shared/types';

export async function followSpace(
    user: DataTypes.UserRecordType,
    spaceId: number,
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
        })
        .catch(error => onError(error));
}
