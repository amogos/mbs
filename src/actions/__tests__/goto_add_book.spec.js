import * as ActionTypes from '../../constants/action_constant'
import * as Strings from '../../constants/string_constant'
import * as Actions from '../index'

describe('gotoAddBook(message)', () => {
    it('should build goto add book action with message set', () => {
        const text = Strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_ADD_BOOK,
            message: text
        }
        expect(Actions.gotoAddBook(text)).toEqual(expectedAction)
    })
    it('should build goto add book action with no message set', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_ADD_BOOK,
        }
        expect(Actions.gotoAddBook()).toEqual(expectedAction)
    })
})