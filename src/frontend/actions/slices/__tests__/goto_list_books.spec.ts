import * as ActionTypes from '../../../../shared/constants/action_constant';
import { pageAction } from '../..';

const { PageActionConstant } = ActionTypes.default;

describe('gotoListBooks ', () => {
    it('Should create action for going to books listing', () => {
        const expectedAction = {
            type: PageActionConstant.ACTION_GOTO_LIST_BOOKS,
        };
        const emptyFilters: string[] = [];
        expect(pageAction.gotoListBooks(emptyFilters)).toEqual(expectedAction);
    });
});
