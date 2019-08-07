import React from 'react';
import * as DataTypes from '../types';
import { Avatar } from 'antd';

interface Props {
    spaces: DataTypes.SpaceType[];
}

const SpacesComponent = (props: Props) => {
    alert(JSON.stringify(props.spaces));
    return null;
};

export default SpacesComponent;
