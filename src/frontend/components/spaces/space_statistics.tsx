import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Icon, Divider } from 'antd';
import Aux, { withStyle } from './../aux_component';

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
        <Aux>
            <Icon type="team" /> {numberOfFollowers}
            {IconRating(rating)}
            {IconFormat(format, numberOfBooks)}
        </Aux>
    );
};

export default withStyle(SpaceStatistics, 'space_statistics');
