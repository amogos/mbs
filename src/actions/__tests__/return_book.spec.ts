import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';

describe('returnBook(bookKey)', () => {
    it('should build action for returning book', () => {
        let bookKey = 1;
        const expectedAction = {
            type: ActionTypes.ACTION_RETURN_BOOK,
            bookKey: bookKey,
        };
        expect(Actions.returnBook(bookKey)).toEqual(expectedAction);
    });
});
