import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlUsers, urlUserReviews } from './constants';
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

async function getUserReviews(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserReviewRecordType[]> {
    let result: DataTypes.UserReviewRecordType[] = [];

    await axios
        .get(`${urlUserReviews}?userId=${id}`)
        .then(response => (result = response.data))
        .catch(error => onError(error));

    return result;
}

async function getUserRating(id: number, onError: (resultCode: number) => void): Promise<number> {
    let rating = 0;
    const reviews: DataTypes.UserReviewRecordType[] = await getUserReviews(id, onError);
    reviews.forEach(review => (rating = rating + review.stateScore));
    rating = reviews.length > 0 ? rating / reviews.length : 0;
    return rating;
}

/**
 * Called uppon fb login. Adds new user or updates existing.
 *
 * @param {DataTypes.UserValueType} user
 * @param { (resultCode: number) => void} onError
 * @public
 */
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
                //  update rating
                const userRating = await getUserRating(userData.id, onError);
                if (userData.rating !== userRating) {
                    userData.rating = userRating;
                    const userIdUrl = `${urlUsers}/${userData.id}`;
                    await axios.put(userIdUrl, userData).catch(error => onError(error));
                }
                //  set some profile pic
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
