// src/index.js
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

import App from './components/main_component';
import FirebaseConnector from './connectors/firebase_connector'
import FacebookConnector from './connectors/facebook_connector'

const store = createStore(rootReducer)

var databaseConnector = new FirebaseConnector()
var socialConnector = new FacebookConnector()

ReactDom.render(
    <Provider store={store}>
        <App dbconnector={databaseConnector}
            socialconnector={socialConnector}
        />
    </Provider>
    , document.getElementById("root"));
