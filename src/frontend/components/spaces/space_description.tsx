import React from 'react';
import * as DataTypes from '../../../shared/types';
import Aux, { withStyle } from './../aux_component';

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceDescription = (props: Props) => {
    const { title, description } = props.item;
    return (
        <Aux>
            <p className="space_description_title">{title}</p>
            <p className="space_description_description">{description}</p>
        </Aux>
    );
};

export default withStyle(SpaceDescription, 'space_description');
