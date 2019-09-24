import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlUsers } from './constants';
import * as SpacesEndpoint from './spaces';

async function addNewUser(
    user: DataTypes.UserValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let newUserData = DataTypes.NullUser;
    await axios
        .post(urlUsers, user)
        .then(response => {
            newUserData = response.data;
        })
        .catch(error => onError(error));
    await SpacesEndpoint.addDefaultSpaceForUser(newUserData, onError);

    return newUserData;
}

export async function getUserRecordTypeFromValueType(
    user: DataTypes.UserValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let userData = DataTypes.NullUser;

    await axios
        .get(`${urlUsers}?email=${user.email}`)
        .then(async response => {
            const isNewUser = response.data.length === 0;
            if (isNewUser) {
                userData = await addNewUser(user, onError);
            } else {
                userData = response.data[0];
                const profilePictureAvailable = userData.picture !== DataTypes.NullUser.picture;
                if (!profilePictureAvailable) {
                    userData.picture = user.picture;
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
    let userRecord: DataTypes.UserRecordType = DataTypes.NullUser;
    await axios
        .get(`${urlUsers}?id=${id}`)
        .then(response => {
            if (response.data.length > 0) userRecord = response.data[0];
        })
        .catch(error => {
            onError(error);
        });
    return userRecord;
}
