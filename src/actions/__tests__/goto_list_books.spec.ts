import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../tree_actions';

const { TreeActionConstant } = ActionTypes.default;

describe('gotoListBooks ', () => {
    it('Should create action for going to books listing', () => {
        const expectedAction = {
            type: TreeActionConstant.ACTION_GOTO_LIST_BOOKS,
        };
        expect(Actions.gotoListBooks()).toEqual(expectedAction);
    });
});
