import * as ActionTypes from '../../../../shared/constants/action_constant';
import * as Actions from '../social_actions';
import * as DataTypes from '../../../../shared/types';

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
