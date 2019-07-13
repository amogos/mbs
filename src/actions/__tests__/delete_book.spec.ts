import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../book_actions';

const { BookActionConstant } = ActionTypes.default;

describe('deleteBook(bookKey)', () => {
    it('should build action for deleting book', () => {
        let bookId = 1;
        const expectedAction = {
            type: BookActionConstant.ACTION_DELETE_BOOK,
            bookKey: bookId,
        };
        expect(Actions.deleteBook(bookId)).toEqual(expectedAction);
    });
});
