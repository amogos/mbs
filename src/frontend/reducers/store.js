import { createStore } from 'redux';
import rootReducer from './index';

const sessionState = sessionStorage.getItem('state');
let store = createStore(rootReducer, sessionState ? JSON.parse(sessionState) : {});

store.subscribe(() => {
    sessionStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;
