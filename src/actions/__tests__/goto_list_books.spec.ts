import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';

describe('gotoListBooks ', () => {
    it('Should create action for going to books listing', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_LIST_BOOKS,
        };
        expect(Actions.gotoListBooks()).toEqual(expectedAction);
    });
});
