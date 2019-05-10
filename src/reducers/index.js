import { combineReducers } from 'redux'
import tree from './tree_reducer'

const rootReducer = combineReducers({
    tree,
    /* add other reducers here */
})

export default rootReducer
