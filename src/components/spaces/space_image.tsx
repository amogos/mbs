import React from 'react';
import * as DataTypes from '../../types';

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceImage = (props: Props) => {
    return (
        <img
            alt="example"
            src="https://static1.squarespace.com/static/52e90e99e4b04f8e0ba4b3f8/t/5980a7c9cd39c3a86f4d57aa/1501603792367/"
        />
    );
};

export default SpaceImage;
