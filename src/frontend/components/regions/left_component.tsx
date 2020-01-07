import React from 'react';
import { withStyle, requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import AboutComponent from './../about/about';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const LeftComponent = (props: Props) => {
    return <AboutComponent />;
};

export default requiresLogin(withStyle(LeftComponent, 'left_component'));
