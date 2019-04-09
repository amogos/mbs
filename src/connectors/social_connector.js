export default class SocialConnector {
    constructor() {   
        this.state = { loggedIn: false, userdata: {} };
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

    setLoggedIn(logged) {
        this.state.loggedIn = logged;
    }

    getUserInfo() {
        return this.state.userdata;
    }

    setUserInfo(info) {
        this.state.userdata = info;
    }

}