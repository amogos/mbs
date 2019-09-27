import React from 'react';
import { Icon, Tooltip } from 'antd';
import * as DataTypes from '../../../shared/types';

interface Props {
    item: DataTypes.SpaceType;
    actions: { follow: () => void; subscribe: () => void; add: () => void; edit: () => void };
    icons: { follow: string; subscribe: string; add: string; edit: string };
    owner: boolean;
}

const SpaceActions = (props: Props) => {
    if (props.owner) {
        return [
            <a onClick={props.actions.add}>
                <Tooltip title="add">
                    <Icon type={props.icons.add} />
                </Tooltip>
            </a>,
            <a onClick={props.actions.add}>
                <Tooltip title="edit">
                    <Icon type={props.icons.edit} />
                </Tooltip>
            </a>,
        ];
    } else {
        return [
            <a onClick={props.actions.follow}>
                <Tooltip title="follow">
                    <Icon type={props.icons.follow} />
                </Tooltip>
            </a>,
            <a onClick={props.actions.subscribe}>
                <Tooltip title="subscribe">
                    <Icon type={props.icons.subscribe} />
                </Tooltip>
            </a>,
        ];
    }
};

export default SpaceActions;
