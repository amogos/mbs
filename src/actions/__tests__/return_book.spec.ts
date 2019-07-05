import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';

describe('returnBook(bookKey)', () => {
    it('should build action for returning book', () => {
        let bookId = 1;

        const expectedAction = {
            type: ActionTypes.ACTION_RETURN_BOOK,
            bookId: bookId,
        };
        expect(Actions.returnBook(bookId)).toEqual(expectedAction);
    });
});
