import React from 'react';
import * as DataTypes from '../../types';
import { Icon, Divider } from 'antd';

interface Props {
    item: DataTypes.SpaceType;
}

const IconFormat = (format: number, numberOfBooks: number) => {
    return (
        <span>
            <Divider type="vertical" />
            <Icon type="book" />
            {numberOfBooks}
        </span>
    );
};

const IconRating = (rating: number) => {
    return (
        <span>
            <Divider type="vertical" />
            <Icon type="compass" />
            {rating}
        </span>
    );
};

const SpaceStatistics = (props: Props) => {
    const { numberOfFollowers, rating, numberOfBooks, format } = props.item;
    return (
        <span>
            <Icon type="team" /> {numberOfFollowers}
            {IconRating(rating)}
            {IconFormat(format, numberOfBooks)}
        </span>
    );
};

export default SpaceStatistics;
