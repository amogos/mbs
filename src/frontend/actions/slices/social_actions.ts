import * as DataTypes from '../../../shared/types';
import * as ActionTypes from '../../../shared/constants/action_constant';

const { SocialActionConstant } = ActionTypes.default;

class SocialAction {
    public addUserData = (userdata: DataTypes.UserRecordType) => ({
        type: SocialActionConstant.ACTION_USER_DATA,
        userdata,
    });
    public loginUser = (user: DataTypes.UserValueType) => ({
        type: SocialActionConstant.ACTION_LOGIN_USER,
        user,
    });
    public logoutUser = () => ({ type: SocialActionConstant.ACTION_LOGOUT_USER });
}

export default SocialAction;
