// src/index.js
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import Store from './store'
import MainContainer from './containers/main_container';

ReactDom.render(
    <Provider store={Store}>
        <MainContainer />
    </Provider>
    , document.getElementById("root"));
