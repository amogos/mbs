// src/index.js
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import Store from './store'
import MainContainer from './containers/main_container';
import ConfirmationDialogContainer from './containers/confirmation_dialog_container';

ReactDom.render(
    <Provider store={Store}>
        <MainContainer />
        <ConfirmationDialogContainer/>
    </Provider>
    , document.getElementById("root"));
