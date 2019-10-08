import { combineReducers } from 'redux';

import mainReducer from './main_reducer';

const reducers = {
    mainReducer,
};

export default combineReducers(reducers);
