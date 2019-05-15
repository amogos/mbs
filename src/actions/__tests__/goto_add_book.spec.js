import * as ActionTypes from '../../constants/action_constant'
import * as Strings from '../../constants/string_constant'
import * as Actions from '../index'

describe('gotoAddBook(message)', () => {
    it('should go to add book page with message if set', () => {
        const text = Strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_ADD_BOOK,
            message: text
        }
        expect(Actions.gotoAddBook(text)).toEqual(expectedAction)
    })
    it('should go to add book page with undefined message when no message set', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_GOTO_ADD_BOOK,
        }
        expect(Actions.gotoAddBook()).toEqual(expectedAction)
    })
})