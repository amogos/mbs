import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlUsers, urlUserReviews } from './constants';
import * as SpacesEndpoint from './spaces';
import { SocialNetwork } from '../../shared/constants/social_networks_constants';
import { NullUserRecordType } from '../../shared/types';

async function addNewUser(
    user: DataTypes.UserValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    let newUserData = DataTypes.NullUserRecordType();
    await axios
        .post(urlUsers, user)
        .then(response => {
            newUserData = response.data;
        })
        .catch(error => onError(error));
    await SpacesEndpoint.addDefaultSpaceForUser(newUserData, onError);

    return newUserData;
}

export async function updateUser(user: DataTypes.UserRecordType, onError: (resultCode: number) => void): Promise<void> {
    const url = `${urlUsers}/${user.id}`;
    await axios.put(url, user).catch(error => onError(error));
}

/** solve any resolved pending subscription on user login */
export async function syncUserSubscrptions(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<void> {
    const { subscriptions, pendingSubscriptions } = user;

    for (let i = pendingSubscriptions.length - 1; i >= 0; i--) {
        const space = await SpacesEndpoint.getSpace(pendingSubscriptions[i], onError);
        const acceptedSubscription =
            space.pendingUsers.includes(user.id) === false && space.subscribedUsers.includes(user.id);
        const rejectedSubscription =
            space.pendingUsers.includes(user.id) === false && space.subscribedUsers.includes(user.id) === false;

        if (acceptedSubscription) {
            subscriptions.push(space.id);
            pendingSubscriptions.pop();
        } else if (rejectedSubscription) {
            pendingSubscriptions.pop();
        }
    }
    await updateUser(user, onError);
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
    let userRecord: DataTypes.UserRecordType = DataTypes.NullUserRecordType();
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
    let userData = DataTypes.NullUserRecordType();

    await axios
        .get(`${urlUsers}?email=${email}`)
        .then(response => {
            if (response.data.length > 0) userData = response.data[0];
        })
        .catch(error => onError(error));

    return userData;
}

export async function signUpUser(
    user: DataTypes.UserValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserRecordType> {
    return await addNewUser(user, onError);
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
            const profilePictureAvailable = userData.picture !== DataTypes.NullUserRecordType().picture;
            if (!profilePictureAvailable) {
                userData.picture = user.picture;
            }
        }
    } else {
        const customAccountWithPasswordMismatch =
            userData.socialnetwork === SocialNetwork.custom && user.password !== userData.password;
        const socialNetworkMismatch = user.socialnetwork !== userData.socialnetwork;

        if (customAccountWithPasswordMismatch || socialNetworkMismatch) {
            if (onUserError) onUserError();
            userData = NullUserRecordType();
        }
    }
    return userData;
}
