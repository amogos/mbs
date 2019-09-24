// src/index.js
import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';
import './frontend/components/common.css';
import { Provider } from 'react-redux';
import Store from './frontend/store';
import BannerContainer from './frontend/containers/banner_container';
import MainContainer from './frontend/containers/main_container';

ReactDom.render(
    <Provider store={Store}>
        <BannerContainer />
        <MainContainer />
    </Provider>,
    document.getElementById('root'),
);
