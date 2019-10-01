// src/index.js
import React from 'react';
import ReactDom from 'react-dom';

import 'antd/dist/antd.css';
import './frontend/components/common.css';
import './frontend/components/regions/regions.css';
import './frontend/components/banner/banner.css';
import './frontend/components/books/books.css';
import './frontend/components/spaces/spaces.css';

import { Provider } from 'react-redux';
import Store from './frontend/store';
import BannerContainer from './frontend/containers/banner_container';
import MainContainer from './frontend/containers/main_container';
import RightContainer from './frontend/containers/right_container';
import TopContainer from './frontend/containers/top_container';

ReactDom.render(
    <Provider store={Store}>
        <BannerContainer />
        <MainContainer />
        <RightContainer />
        <TopContainer />
    </Provider>,
    document.getElementById('root'),
);
