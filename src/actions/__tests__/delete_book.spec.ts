import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';

describe('deleteBook(bookKey)', () => {
    it('should build action for deleting book', () => {
        let bookKey = 'iehfjwnfjksdbsd';
        const expectedAction = {
            type: ActionTypes.ACTION_DELETE_BOOK,
            bookKey: bookKey,
        };
        expect(Actions.deleteBook(bookKey)).toEqual(expectedAction);
    });
});
