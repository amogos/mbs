// src/index.js
import React from 'react'; // eslint-disable-line  
import ReactDom from 'react-dom'; // eslint-disable-line
import { Provider } from 'react-redux'; // eslint-disable-line
import Store from './store'; // eslint-disable-line
import BannerContainer from './containers/banner_container'; // eslint-disable-line
import MainContainer from './containers/main_container'; // eslint-disable-line
import ConfirmationDialogContainer from './containers/confirmation_dialog_container';  // eslint-disable-line

ReactDom.render(
    <Provider store={Store}>
        <BannerContainer />
        <MainContainer />
        <ConfirmationDialogContainer />
    </Provider>,
    document.getElementById('root'),
);
