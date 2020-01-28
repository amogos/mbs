import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { History } from 'history';
import { requiresCondition } from '../hooks/hooks';
import { Button } from 'antd';
import { AppPages, SpaceType } from '../../../shared/types';

export interface Props extends RouteComponentProps {
    urlparams: DataTypes.UrlParms;
    history: History;
    space: SpaceType;
    unsubscribeSpace: (spaceId: number, onSuccess?: () => void, onFail?: () => void) => void;
}

enum States {
    STATE_INIT = 0,
    STATE_COMPLETED = 1,
    STATE_FAILED = 2,
}

const UnSubscribeComponent = (props: Props) => {
    const [state, setState] = useState(States.STATE_INIT);
    const [message, setMessage] = useState('');
    const { id, title, description } = props.space;

    const onUnSubscribeClicked = () => {
        props.unsubscribeSpace(
            id,
            () => {
                setState(States.STATE_COMPLETED);
                setMessage('Request to unsubscribe this space sent successfully');
            },
            () => {
                setState(States.STATE_FAILED);
                setMessage('Request failed');
            },
        );
    };

    const onReturnToMainPageClicked = () => {
        props.history.push(`/${AppPages.Spaces}`);
    };

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <h3>By unsubscribing this space you lose access posibilities and associated news and notifications.</h3>
            <div>{message}</div>
            {state === States.STATE_COMPLETED ? (
                <Button onClick={onReturnToMainPageClicked}>Go back to main page</Button>
            ) : (
                <Button onClick={onUnSubscribeClicked}>Unsubscribe</Button>
            )}
        </div>
    );
};

function validProps(props: Props): boolean {
    return props.space != null;
}

export default withRouter(requiresCondition(UnSubscribeComponent, (props: Props) => validProps(props)));
