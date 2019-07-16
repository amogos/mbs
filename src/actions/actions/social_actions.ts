import * as DataTypes from '../../types';
import * as ActionTypes from '../../constants/action_constant';

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
}

export default SocialAction;
