import * as ActionTypes from '../../../constants/action_constant';
import { bookAction } from '../..';

const { BookActionConstant } = ActionTypes.default;

describe('assignBook(bookKey)', () => {
    it('should build action for assigning book', () => {
        let bookId = 1;
        let ownerId = 1;
        const expectedAction = {
            type: BookActionConstant.ACTION_ASK_BOOK,
            bookId: bookId,
            ownerId: ownerId,
        };
        expect(bookAction.askBook(bookId, ownerId)).toEqual(expectedAction);
    });
});
