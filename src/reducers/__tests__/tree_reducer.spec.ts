import treeReducer from './../tree_reducer'
import * as ActionTypes from './../../constants/action_constant'

describe('Tree reducer testing', () => {
    it('Should return initial state if no action passed', () => {
        let initialState = {}
        expect(treeReducer(undefined, { type: ActionTypes.ACTION_NONE })).toEqual(initialState);
    })
})