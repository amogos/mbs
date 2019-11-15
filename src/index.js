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
import TopContainer from './frontend/containers/top_container';
import PageNotFound from './frontend/components/errors/page_not_found';

import Aux from './frontend/components/aux_component';
import { pageAction } from './frontend/actions';

const Pages = ['spaces', 'books'];

const App = routeParams => {
    if (!Object.fromEntries) {
        //  compatibility with ie, edge, opera android
        Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));
    }

    const query = Object.fromEntries(new URLSearchParams(useLocation().search));
    const id = routeParams.match.params.id;
    const urlparams = { id, query };

    Store.dispatch(pageAction.addUrlParams(urlparams));

    if (!id || Pages.includes(id)) {
        return (
            <Aux>
                <BannerContainer />
                <MainContainer />
                <RightContainer />
                <TopContainer />
            </Aux>
        );
    }

    return <PageNotFound />;
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
