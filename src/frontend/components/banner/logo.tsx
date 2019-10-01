import React from 'react';
import { withStyle } from './../aux_component';
import LogoImage from './../../images/logo.png';

const Logo = () => {
    return <img src={LogoImage} />;
};

export default withStyle(Logo, 'logo');
