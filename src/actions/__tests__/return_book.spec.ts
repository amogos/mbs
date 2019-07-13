import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../book_actions';

const { BookActionConstant } = ActionTypes.default;

describe('returnBook(bookKey)', () => {
    it('should build action for returning book', () => {
        let bookId = 1;

        const expectedAction = {
            type: BookActionConstant.ACTION_RETURN_BOOK,
            bookId: bookId,
        };
        expect(Actions.returnBook(bookId)).toEqual(expectedAction);
    });
});
