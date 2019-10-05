import React from 'react';
import { withStyle, requiresLogin } from '../aux_component';
import Aux from './../aux_component';
import { Divider } from 'antd';
import * as DataTypes from './../../../shared/types';

interface Props {
    page: string;
    userdata: DataTypes.UserRecordType;
}

const TopComponent = (props: Props) => {
    return (
        <Aux>
            NEW TITLES
            <Divider />
            <p> text </p>
            <p> text </p>
            <p> text </p>
        </Aux>
    );
    return null;
};

export default requiresLogin(withStyle(TopComponent, 'top_component'), null);
