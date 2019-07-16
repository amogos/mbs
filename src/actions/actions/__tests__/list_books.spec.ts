import * as ActionTypes from '../../../constants/action_constant';
import { treeAction } from '../..';

let { TreeActionConstant } = ActionTypes.default;

describe('listBooks(message)', () => {
    it('should build action for books listing', () => {
        const expectedAction = {
            type: TreeActionConstant.ACTION_LIST_BOOKS,
        };
        expect(treeAction.listBooks()).toEqual(expectedAction);
    });
});
