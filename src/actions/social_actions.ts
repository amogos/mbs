import * as DataTypes from '../types';
import * as ActionTypes from '../constants/action_constant';

export const addUserData = (userdata: DataTypes.UserRecordType) => ({
    type: ActionTypes.default.SocialActionConstant.ACTION_USER_DATA,
    userdata,
});
export const loginUser = (user: DataTypes.UserValueType) => ({
    type: ActionTypes.default.SocialActionConstant.ACTION_LOGIN_USER,
    user,
});
