import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';

describe('listBooks(message)', () => {
    it('should build action for books listing', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_LIST_BOOKS,
        };
        expect(Actions.listBooks()).toEqual(expectedAction);
    });
});
