import React from 'react';
import { Icon, Tooltip } from 'antd';
import * as DataTypes from '../../../shared/types';

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceActions = (props: Props) => {
    return [
        <a onClick={() => {}}>
            <Tooltip title="follow">
                <Icon type="eye" />
            </Tooltip>
        </a>,
        <a onClick={() => {}}>
            <Tooltip title="subscribe">
                <Icon type="unlock" />
            </Tooltip>
        </a>,
    ];
};

export default SpaceActions;
