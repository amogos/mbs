import * as ActionTypes from '../../../constants/action_constant';
import { treeAction } from '../..';

const { TreeActionConstant } = ActionTypes.default;

describe('gotoListBooks ', () => {
    it('Should create action for going to books listing', () => {
        const expectedAction = {
            type: TreeActionConstant.ACTION_GOTO_LIST_BOOKS,
        };
        expect(treeAction.gotoListBooks()).toEqual(expectedAction);
    });
});
