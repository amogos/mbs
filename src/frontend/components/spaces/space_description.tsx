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
            <p className="thick">{title}</p>
            <p className="light">{description}</p>
        </Aux>
    );
};

export default withStyle(SpaceDescription, 'space_description');
