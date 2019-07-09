import * as ActionTypes from '../../constants/social_actions_constants';
import * as Actions from '../social_actions';
import * as DataTypes from '../../types';

describe('addUserData ', () => {
    it('Should create action for setting user data', () => {
        let userdata = { name: 'pixidixi', email: 'pixidixi@gmail.com' } as DataTypes.UserValueType;
        const expectedAction = {
            type: ActionTypes.ACTION_USER_DATA,
            userdata: userdata,
        };
        //    expect(Actions.addUserData(userdata)).toEqual(expectedAction);
    });
});
