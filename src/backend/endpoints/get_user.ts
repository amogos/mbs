import axios from 'axios';
import * as DataTypes from '../../types';
import { urlUsers } from './constants';

export async function getUserRecordTypeFromValueType(
    user: DataTypes.UserValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let userData = DataTypes.NullUser;

    await axios
        .get(urlUsers + '?email=' + user.email)
        .then(async response => {
            const isNewUser = response.data.length === 0;
            if (isNewUser) {
                await axios
                    .post(urlUsers, user)
                    .then(response => {
                        userData = response.data[0];
                    })
                    .catch(error => onError(error));
            } else {
                userData = response.data[0];

                const profilePictureAvailable = userData.picture !== DataTypes.NullUser.picture;
                const socialMediaPicture = user.picture;

                if (!profilePictureAvailable) {
                    userData.picture = socialMediaPicture;
                }
            }
        })
        .catch(error => onError(error));

    return userData;
}

export async function getUserRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let spaceOwner: DataTypes.UserRecordType = DataTypes.NullUser;
    await axios
        .get(`${urlUsers}?id=${id}`)
        .then(response => (spaceOwner = response.data))
        .catch(error => {
            onError(error);
        });
    return spaceOwner;
}
