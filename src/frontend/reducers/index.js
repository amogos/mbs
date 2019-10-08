import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import mainReducer from './main_reducer';

const reducers = {
    mainReducer,
    session: sessionReducer,
};

export default combineReducers(reducers);
