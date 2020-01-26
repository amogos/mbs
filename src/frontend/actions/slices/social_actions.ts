import * as DataTypes from '../../../shared/types';
import * as ActionTypes from '../../../shared/constants/action_constant';
import { Action } from 'redux';

const { SocialActionConstant } = ActionTypes.default;

/** AddUserAction */
export interface AddUserActionType extends Action<string> {
    userdata: DataTypes.UserRecordType;
}

export const addUserData = (userdata: DataTypes.UserRecordType): AddUserActionType => ({
    type: SocialActionConstant.ACTION_USER_DATA,
    userdata,
});

/** UpdateUserAction */
export interface UpdateUserActionType extends Action<string> {
    userdata: DataTypes.UserRecordType;
}

export const updateUserData = (userdata: DataTypes.UserRecordType): UpdateUserActionType => ({
    type: SocialActionConstant.ACTION_UPDATE_USER_DATA,
    userdata,
});

/** SignupUserAction */
export interface SignupUserActionType extends Action<string> {
    userdata: DataTypes.UserValueType;
}

export const signUpUser = (userdata: DataTypes.UserValueType): SignupUserActionType => ({
    type: SocialActionConstant.ACTION_SIGN_UP_USER,
    userdata,
});

/** LoginUserAction */
export interface LoginUserActionType extends Action<string> {
    userdata: DataTypes.UserValueType;
    onError: (() => void) | undefined;
}

export const loginUser = (userdata: DataTypes.UserValueType, onError?: () => void): LoginUserActionType => ({
    type: SocialActionConstant.ACTION_LOGIN_USER,
    userdata,
    onError,
});

/** LogoutUserAction */
export type LogoutUserActionType = Action<string>;
export const logoutUser = (): LogoutUserActionType => ({ type: SocialActionConstant.ACTION_LOGOUT_USER });

export type SocialAction =
    | AddUserActionType
    | UpdateUserActionType
    | SignupUserActionType
    | LoginUserActionType
    | LogoutUserActionType;
