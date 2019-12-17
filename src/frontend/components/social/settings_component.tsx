import React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Button } from 'antd';

interface Props {
    history: History;
}

const Settings = (props: Props) => {
    const OnSettingsClicked = (props: Props) => {
        props.history.push('/settings');
    };
    return (
        <Button type="link" onClick={() => OnSettingsClicked(props)}>
            Settings
        </Button>
    );
};

export default withRouter(Settings);
