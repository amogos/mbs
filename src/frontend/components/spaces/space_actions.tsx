import React from 'react';
import { Icon, Tooltip } from 'antd';
import * as DataTypes from '../../../shared/types';

interface Props {
    item: DataTypes.SpaceType;
    actions: { follow: () => void; subscribe: () => void; add: () => void; edit: () => void };
    owner: boolean;
}

const SpaceActions = (props: Props) => {
    if (props.owner) {
        return [
            <a onClick={props.actions.add}>
                <Tooltip title="add">
                    <Icon type="plus" />
                </Tooltip>
            </a>,
            <a onClick={props.actions.add}>
                <Tooltip title="edit">
                    <Icon type="edit" />
                </Tooltip>
            </a>,
        ];
    } else {
        return [
            <a onClick={props.actions.follow}>
                <Tooltip title="follow">
                    <Icon type="eye" />
                </Tooltip>
            </a>,
            <a onClick={props.actions.subscribe}>
                <Tooltip title="subscribe">
                    <Icon type="unlock" />
                </Tooltip>
            </a>,
        ];
    }
};

export default SpaceActions;
