// src/index.js
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import MainContainer from './containers/main_container';

const store = createStore(rootReducer)

ReactDom.render(
    <Provider store={store}>
        <MainContainer />
    </Provider>
    , document.getElementById("root"));
