import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar } from 'antd';
import { withStyle } from './../aux_component';

interface Props {
    item: DataTypes.SpaceType;
    onClick: () => void;
}

const SpaceImage = (props: Props) => {
    return <Avatar size={128} icon="" shape="square" />;
};

export default withStyle(SpaceImage, 'space_image');
