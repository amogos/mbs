import * as ActionTypes from '../../../../shared/constants/action_constant';
import { bookAction } from '../..';

const { BookActionConstant } = ActionTypes.default;

describe('assignBook(bookKey)', () => {
    it('should build action for assigning book', () => {
        let bookId = 1;
        let ownerId = 1;
        let duration = 10;

        const expectedAction = {
            type: BookActionConstant.ACTION_ASK_BOOK,
            bookId: bookId,
            ownerId: ownerId,
            duration: duration,
        };
        expect(bookAction.askBook(bookId, ownerId, duration)).toEqual(expectedAction);
    });
});
