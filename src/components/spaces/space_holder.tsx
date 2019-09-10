import React from 'react';
import * as DataTypes from '../../types';
import { Card, Avatar } from 'antd';

import SpaceImage from './space_image';
import SpaceActions from './space_actions';

const { Meta } = Card;

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceHolder = (props: Props) => {
    const { user } = props.item;

    return (
        <Card style={{ width: 300 }} cover={SpaceImage(props)} actions={SpaceActions(props)}>
            <Meta avatar={<Avatar src={props.item.user.picture} />} title={user.name} description={props.item.nbooks} />
        </Card>
    );
};

export default SpaceHolder;
