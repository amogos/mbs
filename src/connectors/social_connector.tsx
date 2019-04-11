import * as Types from "../types"

export default class SocialConnector {
    state: { loggedIn: boolean; userdata: Types.UserType; };

    constructor() {
        this.state = { loggedIn: false, userdata: { name:"", email:""} };
        this.init();
    }

    init() {
        throw new Error('__abstract_not_implemented__');
    }

    getView() {
        throw new Error('__abstract_not_implemented__');
    }

    getLoggedIn() {
        return this.state.loggedIn;
    }

    setLoggedIn(logged: boolean) {
        this.state.loggedIn = logged;
    }

    getUserInfo() {
        return this.state.userdata;
    }

    setUserInfo(info: Types.UserType) {
        this.state.userdata = info;
    }

}