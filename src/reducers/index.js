import { combineReducers } from 'redux'
import screens from './screen_reducer'

const rootReducer = combineReducers({
    screens,
    /* add other reducers here */
})

export default rootReducer
