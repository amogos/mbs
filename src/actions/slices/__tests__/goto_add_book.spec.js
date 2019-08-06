import * as ActionTypes from '../../../constants/action_constant';
import * as Actions from '../page_actions';

describe('gotoAddBook(message)', () => {
    it('should build goto spaces', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_SPACES,
        };
        expect(Actions.gotoSpaces()).toEqual(expectedAction);
    });
});
