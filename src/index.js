// src/index.js
import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';
import './main.css';
import { Provider } from 'react-redux';
import Store from './store';
import BannerContainer from './containers/banner_container';
import MainContainer from './containers/main_container';

ReactDom.render(
    <Provider store={Store}>
        <BannerContainer />
        <MainContainer />
    </Provider>,
    document.getElementById('root'),
);
