import React from 'react';
import { Aux, withStyle, requiresLogin } from '../hooks/hooks';
import { Divider } from 'antd';
import * as DataTypes from './../../../shared/types';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const RightComponent = (props: Props) => {
    return (
        <Aux>
            POPULAR ON FLIP
            <Divider />
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> </p>
            READING LIST
            <Divider />
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
            <p> text </p>
        </Aux>
    );
};

export default requiresLogin(withStyle(RightComponent, 'right_component'));
