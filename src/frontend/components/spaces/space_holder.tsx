import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Card, Button } from 'antd';

import SpaceImage from './space_image';
import SpaceActions from './space_actions';
import SpaceDescription from './space_description';
import SpaceStatistics from './space_statistics';

interface Props {
    item: DataTypes.SpaceType;
    onClick: () => void;
}

const SpaceHolder = (props: Props) => {
    const onFollowButtonClicked = () => {};
    const onSubscribeButtonClicked = () => {};
    const OnAddBookButtonClicked = () => {};
    const OnEditSpaceButtonClicked = () => {};

    const actions = {
        follow: onFollowButtonClicked,
        subscribe: onSubscribeButtonClicked,
        add: OnAddBookButtonClicked,
        edit: OnEditSpaceButtonClicked,
    };

    return (
        <Button type="link" onClick={props.onClick}>
            <Card style={{ width: 300 }} cover={SpaceImage(props)} actions={SpaceActions({ ...props, actions })}>
                <SpaceDescription {...props} />
                <p />
                <SpaceStatistics {...props} />
            </Card>
        </Button>
    );
};

export default SpaceHolder;
