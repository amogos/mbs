import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';

describe('assignBook(bookKey)', () => {
    it('should build action for assigning book', () => {
        let bookKey = 1;
        const expectedAction = {
            type: ActionTypes.ACTION_ASK_BOOK,
            bookKey: bookKey,
        };
        expect(Actions.assignBook(bookKey)).toEqual(expectedAction);
    });
});
