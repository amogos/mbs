import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';

describe('deleteBook(bookKey)', () => {
    it('should build action for deleting book', () => {
        let bookId = 1;
        const expectedAction = {
            type: ActionTypes.ACTION_DELETE_BOOK,
            bookKey: bookId,
        };
        expect(Actions.deleteBook(bookId)).toEqual(expectedAction);
    });
});
