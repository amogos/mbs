import { createStore, applyMiddleware } from 'redux';
import rootReducer from './index';
import dispatchCacher from '../middleware/dispatch_cacher';

const sessionState = sessionStorage.getItem('state');
const store = createStore(rootReducer, sessionState ? JSON.parse(sessionState) : {}, applyMiddleware(dispatchCacher));
store.subscribe(() => sessionStorage.setItem('state', JSON.stringify(store.getState())));

export default store;
