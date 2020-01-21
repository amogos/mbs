import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { History } from 'history';
import { requiresCondition } from './../hooks/hooks';

export interface Props extends RouteComponentProps {
    urlparams: DataTypes.UrlParms;
    subscribingSpace: DataTypes.SpaceType;
    history: History;
}

const SubscriptionComponent = (props: Props) => {
    return <div>{props.urlparams.id}</div>;
};

function validProps(props: Props): boolean {
    return props.subscribingSpace !== null;
}

export default withRouter(requiresCondition(SubscriptionComponent, (props: Props) => validProps(props)));
