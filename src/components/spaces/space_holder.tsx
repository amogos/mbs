import React from 'react';
import * as DataTypes from '../../types';
import { Card } from 'antd';

import SpaceImage from './space_image';
import SpaceActions from './space_actions';
import SpaceDescription from './space_description';
import SpaceStatistics from './space_statistics';

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceHolder = (props: Props) => {
    return (
        <Card style={{ width: 300 }} cover={SpaceImage(props)} actions={SpaceActions(props)}>
            <SpaceDescription {...props} />
            <p />
            <SpaceStatistics {...props} />
        </Card>
    );
};

export default SpaceHolder;
