import * as ActionTypes from '../../constants/action_constant'
import * as Strings from '../../constants/string_constant'
import * as Actions from '../index'
import * as DataTypes from '../../types'

describe('listBooks(message)', () => {
    it('should build action for books listing', () => {
        let message = {
            text: Strings.default.MYBOOKSHELVE_STRING_BOOK_REMOVED,
            button1: Strings.default.MYBOOKSHELVE_STRING_CONFIRM
        } as DataTypes.ConfirmationDialogParams;
        const expectedAction = {
            type: ActionTypes.ACTION_LIST_BOOKS,
            message: message
        }
        expect(Actions.listBooks(message)).toEqual(expectedAction)
    })
})