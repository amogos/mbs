import * as ActionTypes from '../../../../shared/constants/action_constant';
import { pageAction } from '../..';

let { PageActionConstant: TreeActionConstant } = ActionTypes.default;

describe('listBooks(message)', () => {
    it('should build action for books listing', () => {
        const expectedAction = {
            type: TreeActionConstant.ACTION_LIST_BOOKS,
        };
        expect(pageAction.listBooks()).toEqual(expectedAction);
    });
});
