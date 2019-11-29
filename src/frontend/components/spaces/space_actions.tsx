import React from 'react';
import { Icon, Tooltip } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from './../hooks/hooks';

interface Props {
    item: DataTypes.SpaceType;
    actions: { follow: () => void; subscribe: () => void; add: () => void; edit: () => void };
    icons: {
        follow: { icon: string; tooltip: string };
        subscribe: { icon: string; tooltip: string };
        add: { icon: string; tooltip: string };
        edit: { icon: string; tooltip: string };
    };
    owner: boolean;
}

const SpaceActions = (props: Props) => {
    if (props.owner) {
        return (
            <Aux>
                <a onClick={props.actions.add}>
                    <Tooltip title={props.icons.add.tooltip}>
                        <Icon type={props.icons.add.icon} />
                    </Tooltip>
                </a>

                <a onClick={props.actions.edit}>
                    <Tooltip title={props.icons.edit.tooltip}>
                        <Icon type={props.icons.edit.icon} />
                    </Tooltip>
                </a>
            </Aux>
        );
    } else {
        return (
            <Aux>
                <a onClick={props.actions.follow}>
                    <Tooltip title={props.icons.follow.tooltip}>
                        <Icon type={props.icons.follow.icon} />
                    </Tooltip>
                </a>
                <a onClick={props.actions.subscribe}>
                    <Tooltip title={props.icons.subscribe.icon}>
                        <Icon type={props.icons.subscribe.icon} />
                    </Tooltip>
                </a>
            </Aux>
        );
    }
};

export default withStyle(SpaceActions, 'space_actions');
