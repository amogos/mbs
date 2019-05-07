import React from 'react'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import * as DataTypes from "../types"

type FunctionType1 = (data: DataTypes.UserType) => void;
type FunctionType2 = () => void;

var addUserData: FunctionType1;
var querryBooks: FunctionType2;


const responseFacebook = (response: ReactFacebookLoginInfo) => {
    var userInfo: DataTypes.UserType = { name: response.name, email: response.email } as DataTypes.UserType;
    addUserData(userInfo);
    querryBooks();
}

const componentClicked = () => { }

const FacebookComponent = (props: any) => {
    addUserData = props.addUserData;
    querryBooks = props.querryBooksListing;
    return (<FacebookLogin
        appId="298690497437467"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        icon="fa-facebook" />);
}

export default FacebookComponent;