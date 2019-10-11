import { createStore } from 'redux';
import rootReducer from './index';
import { createStore, applyMiddleware } from 'redux';
import dispatchCacher from '../middleware/dispatch_cacher';

const sessionState = sessionStorage.getItem('state');
let store = createStore(rootReducer, sessionState ? JSON.parse(sessionState) : {}, applyMiddleware(dispatchCacher));
store.subscribe(() => sessionStorage.setItem('state', JSON.stringify(store.getState())));

export default store;
