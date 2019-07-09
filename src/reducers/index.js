import { combineReducers } from 'redux';
import treeReducer from './tree_reducer';
import socialReducer from './social_reducer';
import bookReducer from './book_reducer';
import notificationReducer from './notification_reducer';

const rootReducer = combineReducers({
    treeReducer,
    socialReducer,
    bookReducer,
    notificationReducer,

    /* add other reducers here */
});

export default rootReducer;
