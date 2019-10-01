import React from 'react';
import { withStyle } from '../aux_component';
import Aux from './../aux_component';
import { Divider } from 'antd';
import * as DataTypes from './../../../shared/types';

interface Props {
    page: string;
    userdata: DataTypes.UserRecordType;
}

const RightComponent = (props: Props) => {
    const loggedIn = props.userdata && props.userdata !== DataTypes.NullUser;
    if (loggedIn)
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
    return null;
};

export default withStyle(RightComponent, 'right_component');
