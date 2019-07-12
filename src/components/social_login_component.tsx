import React from 'react';
import * as DataTypes from '../types';
import FacebookContainer from './../containers/facebook_container';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const SocialLoginComponent = (props: Props) => {
    let content;
    if (props.userdata && props.userdata.value.name) {
        content = <div style={{ color: 'white' }}>Welcome: {props.userdata.value.name}</div>;
    } else {
        content = <FacebookContainer />;
    }
    return content;
};

export default SocialLoginComponent;
