import * as ActionTypes from '../../constants/action_constant'
import * as Actions from '../index'
import * as DataTypes from '../../types'

describe('addUserData ', () => {
    it('Should create action for setting user data', () => {
        let userdata = { name: 'pixidixi', email: 'pixidixi@gmail.com' } as DataTypes.UserType;
        const expectedAction = {
            type: ActionTypes.ACTION_USER_DATA,
            userdata: userdata
        }
        expect(Actions.addUserData(userdata)).toEqual(expectedAction)
    })
})