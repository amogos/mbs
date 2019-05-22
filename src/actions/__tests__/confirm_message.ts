import * as ActionTypes from '../../constants/action_constant'
import * as Actions from '../index'

describe('confirmMessage()', () => {
    it('should build action for poping a confirmation message', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_CONFIRM_MESSAGE,
        }
        expect(Actions.confirmMessage()).toEqual(expectedAction)
    })
})