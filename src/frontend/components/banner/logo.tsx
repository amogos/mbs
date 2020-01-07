import React from 'react';
import { withStyle } from './../hooks/hooks';
import LogoImage from './../../images/logo.png';

const Logo = () => {
    return <img src={LogoImage} alt="" />;
};

export default withStyle(Logo, 'logo');
