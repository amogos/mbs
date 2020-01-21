import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { History } from 'history';

export interface Props extends RouteComponentProps {
    urlparams: DataTypes.UrlParms;
    history: History;
}

const SubscriptionComponent = (props: any) => {
    return <div>{props.urlparams.id}</div>;
};

export default withRouter(SubscriptionComponent);
