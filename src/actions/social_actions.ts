import * as DataTypes from '../types';
import * as ActionTypes from '../constants/social_actions_constants';

export const addUserData = (userdata: DataTypes.UserRecordType) => ({ type: ActionTypes.ACTION_USER_DATA, userdata });
export const loginUser = (user: DataTypes.UserValueType) => ({ type: ActionTypes.ACTION_LOGIN_USER, user });
