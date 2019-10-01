import React from 'react';
import { withStyle } from '../aux_component';
import Aux from './../aux_component';
import { Divider } from 'antd';

interface Props {
    page: string;
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
};

export default withStyle(TopComponent, 'top_component');
