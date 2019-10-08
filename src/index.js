// src/index.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';
import './frontend/components/common.css';
import './frontend/components/regions/regions.css';
import './frontend/components/banner/banner.css';
import './frontend/components/books/books.css';
import './frontend/components/spaces/spaces.css';
import './frontend/components/social/social.css';
import './frontend/components/errors/errors.css';

import { Provider } from 'react-redux';
import Store from './frontend/store';
import BannerContainer from './frontend/containers/banner_container';
import MainContainer from './frontend/containers/main_container';
import RightContainer from './frontend/containers/right_container';
import TopContainer from './frontend/containers/top_container';
import PageNotFound from './frontend/components/errors/page_not_found';

import Aux from './frontend/components/aux_component';

const Pages = ['home'];

const App = ownProps => {
    const page = ownProps.match.params.id;

    if (!page || Pages.includes(page)) {
        return (
            <Aux>
                <BannerContainer {...ownProps} />
                <MainContainer {...ownProps} />
                <RightContainer {...ownProps} />
                <TopContainer {...ownProps} />
            </Aux>
        );
    } else {
        return <PageNotFound />;
    }
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
