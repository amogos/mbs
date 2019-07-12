import * as ActionTypes from '../../constants/tree_actions_constants';
import * as Actions from '../tree_actions';

describe('listBooks(message)', () => {
    it('should build action for books listing', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_LIST_BOOKS,
        };
        expect(Actions.listBooks()).toEqual(expectedAction);
    });
});
