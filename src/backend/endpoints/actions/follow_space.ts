import axios from 'axios';
import { urlUsers } from '../constants';
import * as DataTypes from '../../../shared/types';

export async function followSpace(
    user: DataTypes.UserRecordType,
    spaceId: number,
    onError: (resultCode: number) => void,
) {
    const followingSpaces = [...user.following, spaceId];
    await axios
        .put(`${urlUsers}/${user.id}`, { following: followingSpaces })
        .then(() => (user.following = followingSpaces))
        .catch(error => onError(error));
}
