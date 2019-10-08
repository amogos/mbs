import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';
import rootReducer from './reducers/index';

let store = createStore(rootReducer);
sessionService.initSessionService(store);

export default store;
