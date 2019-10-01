import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar } from 'antd';

interface Props {
    item: DataTypes.SpaceType;
    onClick: () => void;
}

const SpaceImage = (props: Props) => {
    return (
        <div className="avatar" onClick={props.onClick}>
            <Avatar size={64} icon="user" />
        </div>
    );
};

export default SpaceImage;
