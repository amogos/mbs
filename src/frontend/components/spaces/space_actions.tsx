import React from 'react';
import { Icon, Tooltip, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from './../hooks/hooks';

interface Props {
    item: DataTypes.SpaceType;
    actions: { subscribe: () => void; add: () => void; edit: () => void };
    icons: {
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
                <Button type="link" onClick={props.actions.add}>
                    <Tooltip title={props.icons.add.tooltip}>
                        <Icon type={props.icons.add.icon} />
                    </Tooltip>
                </Button>

                <Button type="link" onClick={props.actions.edit}>
                    <Tooltip title={props.icons.edit.tooltip}>
                        <Icon type={props.icons.edit.icon} />
                    </Tooltip>
                </Button>
            </Aux>
        );
    } else {
        return (
            <Aux>
                <Button type="link" onClick={props.actions.subscribe}>
                    <Tooltip title={props.icons.subscribe.icon}>
                        <Icon type={props.icons.subscribe.icon} />
                    </Tooltip>
                </Button>
            </Aux>
        );
    }
};

export default withStyle(SpaceActions, 'space_actions');
