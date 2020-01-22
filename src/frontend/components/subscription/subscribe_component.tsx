import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { History } from 'history';
import { requiresCondition } from '../hooks/hooks';
import { Button } from 'antd';
import { AppPages } from '../../../shared/types';

export interface Props extends RouteComponentProps {
    urlparams: DataTypes.UrlParms;
    subscribingSpace: DataTypes.SpaceType;
    history: History;
    subscribeSpace: (spaceId: number, onSuccess?: () => void, onFail?: () => void) => void;
    exitSubscribeSpace: (spaceId: number) => void;
}

enum States {
    STATE_INIT = 0,
    STATE_COMPLETED = 1,
    STATE_FAILED = 2,
}

const SubscribeComponent = (props: Props) => {
    const [state, setState] = useState(States.STATE_INIT);
    const [message, setMessage] = useState('');

    const { id, title, description } = props.subscribingSpace;

    const onSubscribeClicked = () => {
        props.subscribeSpace(
            id,
            () => {
                setState(States.STATE_COMPLETED);
                setMessage('Request to join this space sent successfully');
            },
            () => {
                setState(States.STATE_FAILED);
                setMessage('Request failed');
            },
        );
    };

    const onReturnToMainPageClicked = () => {
        props.exitSubscribeSpace(id);
        props.history.push(`/${AppPages.Spaces}`);
    };

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <h3>The space owner will evaluate your subscription request before granting you full access.</h3>
            <div>{message}</div>
            {state === States.STATE_COMPLETED ? (
                <Button onClick={onReturnToMainPageClicked}>Go back to main page</Button>
            ) : (
                <Button onClick={onSubscribeClicked}>Subscribe</Button>
            )}
        </div>
    );
};

function validProps(props: Props): boolean {
    return props.subscribingSpace !== null && props.subscribingSpace !== undefined;
}

export default withRouter(requiresCondition(SubscribeComponent, (props: Props) => validProps(props)));
