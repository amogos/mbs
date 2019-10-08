import { createStore, applyMiddleware } from 'redux';
import rootReducer from './index';
import sessionCacher from './middleware/session_cacher';

export default createStore(rootReducer, applyMiddleware(sessionCacher));
