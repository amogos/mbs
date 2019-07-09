import * as ActionTypes from '../../constants/tree_actions_constants';
import * as Actions from '../tree_actions';

describe('gotoListBooks ', () => {
    it('Should create action for going to books listing', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_LIST_BOOKS,
        };
        expect(Actions.gotoListBooks()).toEqual(expectedAction);
    });
});
