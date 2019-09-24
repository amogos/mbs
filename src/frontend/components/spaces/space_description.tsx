import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Card } from 'antd';

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceDescription = (props: Props) => {
    const { Meta } = Card;
    const { title, description } = props.item;
    return <Meta className="space_description" title={title} description={description} />;
};

export default SpaceDescription;
