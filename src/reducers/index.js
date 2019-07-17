import { combineReducers } from 'redux';
import mainReducer from './main_reducer';

const rootReducer = combineReducers({
    mainReducer,

    /* add other reducers here */
});

export default rootReducer;
