import * as ActionTypes from '../../constants/book_actions_constants';
import * as Actions from '../book_actions';

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
