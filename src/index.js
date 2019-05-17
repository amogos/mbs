// src/index.js
import React from 'react'  // eslint-disable-line no-unused-vars
import ReactDom from 'react-dom'// eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'// eslint-disable-line no-unused-vars
import Store from './store'// eslint-disable-line no-unused-vars
import BannerContainer from './containers/banner_container';// eslint-disable-line no-unused-vars
import MainContainer from './containers/main_container';// eslint-disable-line no-unused-vars
import ConfirmationDialogContainer from './containers/confirmation_dialog_container';// eslint-disable-line no-unused-vars

ReactDom.render(
    <Provider store={Store}>
        <BannerContainer/>
        <MainContainer />
        <ConfirmationDialogContainer/>
    </Provider>
    , document.getElementById("root"));
