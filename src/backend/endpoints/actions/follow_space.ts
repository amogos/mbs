import axios from 'axios';
import { urlUsers } from '../constants';
import * as DataTypes from '../../../shared/types';

export async function followSpace(
    user: DataTypes.UserRecordType,
    spaceId: number,
    onError: (resultCode: number) => void,
) {
    let newUserData = { ...user, following: [...user.following, spaceId] };

    await axios
        .put(`${urlUsers}/${user.id}`, newUserData)
        .then(() => (user.following = newUserData.following))
        .catch(error => onError(error));
}
