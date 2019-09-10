import React from 'react';
import * as DataTypes from '../../types';
import { Card, Avatar } from 'antd';

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceDescription = (props: Props) => {
    const { Meta } = Card;
    const { user, title, description } = props.item;
    return <Meta avatar={<Avatar src={user.picture} />} title={title} description={description} />;
};

export default SpaceDescription;
