import { createStore, applyMiddleware } from 'redux';
import rootReducer from './index';
import sessionCacher, { sessionState } from './middleware/session_cacher';

export default createStore(rootReducer, sessionState(), applyMiddleware(sessionCacher));
