import React from 'react'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import * as DataTypes from "../types"



const responseFacebook = (response: ReactFacebookLoginInfo, props: any) => {
    var userInfo: DataTypes.UserType = { name: response.name, email: response.email } as DataTypes.UserType;
    props.addUserData(userInfo);
}

const componentClicked = () => { }

const FacebookComponent = (props: any) => {

    return (<FacebookLogin
        appId="298690497437467"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={(response) => responseFacebook(response, props)}
        icon="fa-facebook" />);
}

export default FacebookComponent;