import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlUsers, urlUserReviews } from './constants';
import * as SpacesEndpoint from './spaces';
import { SocialNetwork } from '../../shared/constants/social_networks_constants';

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

export async function getUserRecordTypeFromEmail(
    email: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let userData = DataTypes.NullUser;

    await axios
        .get(`${urlUsers}?email=${email}`)
        .then(response => {
            if (response.data.length > 0) userData = response.data[0];
        })
        .catch(error => onError(error));

    return userData;
}

export async function loginUser(
    user: DataTypes.UserValueType,
    onUserError: () => void,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let userData = await getUserRecordTypeFromEmail(user.email, onError);
    const isNewUser = userData.id === 0;
    if (isNewUser) {
        const needsSignUp = userData.socialnetwork === SocialNetwork.custom;
        if (needsSignUp) {
            if (onUserError) onUserError();
        } else {
            userData = await addNewUser(user, onError);
            //  update/compute rating when logging in or logging out ?????
            const userRating = await getUserRating(userData.id, onError);
            if (userData.rating !== userRating) {
                userData.rating = userRating;
                const userIdUrl = `${urlUsers}/${userData.id}`;
                await axios.put(userIdUrl, userData).catch(error => onError(error));
            }
            //  set some profile pic...if none set on our platform put the social media one ?????
            const profilePictureAvailable = userData.picture !== DataTypes.NullUser.picture;
            if (!profilePictureAvailable) {
                userData.picture = user.picture;
            }
        }
    }
    return userData;
}
