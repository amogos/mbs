import * as ActionTypes from '../../../constants/action_constant';
import * as Actions from '../tree_actions';

describe('gotoAddBook(message)', () => {
    it('should build goto add book action', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_ADD_BOOK,
        };
        expect(Actions.gotoAddBook()).toEqual(expectedAction);
    });
});
