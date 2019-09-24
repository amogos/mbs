import React, { useState } from 'react';
import { Icon, Tooltip, Menu } from 'antd';
import * as DataTypes from '../../../shared/types';

interface Props {
    item: DataTypes.SpaceType;
    actions: { follow: () => void; subscribe: () => void; add: () => void; edit: () => void };
}

const SpaceActions = (props: Props) => {
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);

    const DropDownMenu = () => {
        if (!showDropDownMenu) return null;
        return (
            <Menu>
                <Menu.Item key="1">menu item</Menu.Item>
                <Menu.Item key="2">menu item</Menu.Item>
            </Menu>
        );
    };

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
        <a onClick={() => setShowDropDownMenu(true)}>
            <Tooltip title="more">
                <Icon type="ellipsis" />
                <DropDownMenu />
            </Tooltip>
        </a>,
    ];
};

export default SpaceActions;
