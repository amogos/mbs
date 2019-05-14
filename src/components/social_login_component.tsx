import React from 'react'
import * as DataTypes from "../types";
import FacebookContainer from './../containers/facebook_container'

interface Props {
    userdata: DataTypes.UserType
}

const SocialLoginComponent = (props: Props) => {
    let content;
    let userdata = props.userdata;
    if (userdata !== DataTypes.nullUser) {
        content = (<div style={{ color: 'white' }}>Welcome: {userdata.name}</div>);

    } else {
        content = <FacebookContainer />
    }
    return content;
}

export default SocialLoginComponent