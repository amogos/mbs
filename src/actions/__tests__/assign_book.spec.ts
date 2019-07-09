import * as ActionTypes from '../../constants/book_actions_constants';
import * as Actions from '../book_actions';

describe('assignBook(bookKey)', () => {
    it('should build action for assigning book', () => {
        let bookId = 1;
        let ownerId = 1;
        const expectedAction = {
            type: ActionTypes.ACTION_ASK_BOOK,
            bookId: bookId,
            ownerId: ownerId,
        };
        expect(Actions.askBook(bookId, ownerId)).toEqual(expectedAction);
    });
});
