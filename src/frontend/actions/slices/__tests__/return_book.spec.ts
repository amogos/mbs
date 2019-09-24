import * as ActionTypes from '../../../../shared/constants/action_constant';
import { bookAction } from '../..';

const { BookActionConstant } = ActionTypes.default;

describe('returnBook(bookKey)', () => {
    it('should build action for returning book', () => {
        let bookId = 1;

        const expectedAction = {
            type: BookActionConstant.ACTION_RETURN_BOOK,
            bookId: bookId,
        };
        expect(bookAction.returnBook(bookId)).toEqual(expectedAction);
    });
});
