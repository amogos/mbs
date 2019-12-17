// src/index.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './frontend/reducers/store';

import 'antd/dist/antd.css';
import './main.css';

import BannerContainer from './frontend/containers/banner_container';
import MainContainer from './frontend/containers/main_container';
import RightContainer from './frontend/containers/right_container';
import LeftContainer from './frontend/containers/left_container';
import TopContainer from './frontend/containers/top_container';
import PageNotFound from './frontend/components/errors/page_not_found';

import { pageAction } from './frontend/actions';

const DisplayBook = () => {
    return (
        <div className="app">
            <BannerContainer />
            <div className="middle_area">
                <LeftContainer />
                <MainContainer />
                <RightContainer />
            </div>
        </div>
    );
};

const DisplayBookListing = () => {
    return (
        <div className="app">
            <BannerContainer />
            <TopContainer />
            <div className="middle_area">
                <LeftContainer />
                <MainContainer />
                <RightContainer />
            </div>
        </div>
    );
};

const DisplaySpaceListing = () => {
    return (
        <div className="app">
            <BannerContainer />
            <TopContainer />
            <div className="middle_area">
                <LeftContainer />
                <MainContainer />
                <RightContainer />
            </div>
        </div>
    );
};

const DisplayProfileSettings = () => {
    return (
        <div className="app">
            <BannerContainer />
            <div className="middle_area">
                <LeftContainer />
                <MainContainer />
            </div>
        </div>
    );
};

const DisplayContent = page => {
    switch (page) {
        case 'book':
            return DisplayBook();
        case 'books':
            return DisplayBookListing();
        case 'spaces':
            return DisplaySpaceListing();
        case 'settings':
            return DisplayProfileSettings();
        case undefined:
            return DisplaySpaceListing();
        default:
            return <PageNotFound />;
    }
};

const App = routeParams => {
    if (!Object.fromEntries) {
        //  compatibility with ie, edge, opera android
        Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));
    }
    const query = Object.fromEntries(new URLSearchParams(useLocation().search));
    const id = routeParams.match.params.id;
    const urlparams = { id, query };
    Store.dispatch(pageAction.addUrlParams(urlparams));
    return DisplayContent(id);
};

ReactDom.render(
    <Provider store={Store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/:id" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
