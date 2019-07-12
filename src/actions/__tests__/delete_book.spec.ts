import * as ActionTypes from '../../constants/book_actions_constants';
import * as Actions from '../book_actions';

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
