import * as ActionTypes from '../../../../shared/constants/action_constant';
import { bookAction } from '../..';

const { BookActionConstant } = ActionTypes.default;

describe('deleteBook(bookKey)', () => {
    it('should build action for deleting book', () => {
        let bookId = 1;
        const expectedAction = {
            type: BookActionConstant.ACTION_DELETE_BOOK,
            bookKey: bookId,
        };
        expect(bookAction.deleteBook(bookId)).toEqual(expectedAction);
    });
});
