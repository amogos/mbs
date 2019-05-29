import { combineReducers } from 'redux';
import treeReducer from './tree_reducer';

const rootReducer = combineReducers({
    treeReducer,
    /* add other reducers here */
});

export default rootReducer;
