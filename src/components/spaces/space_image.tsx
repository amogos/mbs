import React from 'react';
import * as DataTypes from '../../types';
import { Avatar } from 'antd';
import './spaces.css';

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceImage = (props: Props) => {
    return (
        <div className="avatar">
            <Avatar size={64} icon="user" />
        </div>
    );
};

export default SpaceImage;
