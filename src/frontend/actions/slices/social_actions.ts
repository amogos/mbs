import * as DataTypes from '../../../shared/types';
import * as ActionTypes from '../../../shared/constants/action_constant';
import { Action } from 'redux';

const { SocialActionConstant } = ActionTypes.default;

export interface AddUserActionType extends Action {
    type: string;
    userdata: DataTypes.UserRecordType;
}

export interface UpdateUserActionType extends Action {
    type: string;
    userdata: DataTypes.UserRecordType;
}

export interface SignupUserActionType extends Action {
    type: string;
    userdata: DataTypes.UserValueType;
}

export interface LoginUserActionType extends Action {
    type: string;
    userdata: DataTypes.UserValueType;
    onError: (() => void) | undefined;
}

export interface LogoutUserActionType extends Action {
    type: string;
}

export type SocialActionType =
    | AddUserActionType
    | UpdateUserActionType
    | SignupUserActionType
    | LoginUserActionType
    | LogoutUserActionType;

class SocialAction {
    public addUserData = (userdata: DataTypes.UserRecordType): AddUserActionType => ({
        type: SocialActionConstant.ACTION_USER_DATA,
        userdata,
    });

    public updateUserData = (userdata: DataTypes.UserRecordType): UpdateUserActionType => ({
        type: SocialActionConstant.ACTION_UPDATE_USER_DATA,
        userdata,
    });

    public signUpUser = (userdata: DataTypes.UserValueType): SignupUserActionType => ({
        type: SocialActionConstant.ACTION_SIGN_UP_USER,
        userdata,
    });

    public loginUser = (userdata: DataTypes.UserValueType, onError?: () => void): LoginUserActionType => ({
        type: SocialActionConstant.ACTION_LOGIN_USER,
        userdata,
        onError,
    });
    public logoutUser = (): LogoutUserActionType => ({ type: SocialActionConstant.ACTION_LOGOUT_USER });
}

export default SocialAction;
