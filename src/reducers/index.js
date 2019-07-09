import { combineReducers } from 'redux';
import treeReducer from './tree_reducer';
import socialReducer from './social_reducer';

const rootReducer = combineReducers({
    treeReducer,
    socialReducer,

    /* add other reducers here */
});

export default rootReducer;
