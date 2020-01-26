// src/index.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './frontend/reducers/store';
import './main.css';
import 'antd/dist/antd.css';
import { DisplayContent } from './frontend/screens/display_content';
import * as Action from './frontend/actions';

const App = routeParams => {
    if (!Object.fromEntries) {
        //  compatibility with ie, edge, opera android
        Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));
    }
    const query = Object.fromEntries(new URLSearchParams(useLocation().search));
    const id = routeParams.match.params.id;
    const urlparams = { id, query };
    Store.dispatch(Action.addUrlParams(urlparams));
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
