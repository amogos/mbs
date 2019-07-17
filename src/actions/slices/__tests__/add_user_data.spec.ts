import * as ActionTypes from '../../../constants/action_constant';
import * as Actions from '../social_actions';
import * as DataTypes from '../../../types';

const { SocialActionConstant } = ActionTypes.default;

describe('addUserData ', () => {
    it('Should create action for setting user data', () => {
        let userdata = { name: 'pixidixi', email: 'pixidixi@gmail.com' } as DataTypes.UserValueType;
        const expectedAction = {
            type: SocialActionConstant.ACTION_USER_DATA,
            userdata: userdata,
        };
        //    expect(Actions.addUserData(userdata)).toEqual(expectedAction);
    });
});
