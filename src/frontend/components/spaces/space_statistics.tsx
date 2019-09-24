import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Icon, Divider } from 'antd';

interface Props {
    item: DataTypes.SpaceType;
}

const IconFormat = (format: string[], numberOfBooks: number) => {
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
        <div className="space_statistics">
            <Icon type="team" /> {numberOfFollowers}
            {IconRating(rating)}
            {IconFormat(format, numberOfBooks)}
        </div>
    );
};

export default SpaceStatistics;
