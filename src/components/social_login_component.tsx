import React from 'react';
import * as DataTypes from '../types';
import FacebookContainer from './../containers/facebook_container';

interface Props {
    userdata: DataTypes.UserType;
}

const SocialLoginComponent = (props: Props) => {
    let content;
    if (props.userdata && props.userdata.name) {
        content = <div style={{ color: 'white' }}>Welcome: {props.userdata.name}</div>;
    } else {
        content = <FacebookContainer />;
    }
    return content;
};

export default SocialLoginComponent;
