import React from 'react';
import { withStyle } from '../aux_component';
import Aux from './../aux_component';
import { Divider } from 'antd';

interface Props {
    page: string;
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

export default withStyle(RightComponent, 'right_component');
