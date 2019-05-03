import * as Types from "../types"

export default class SocialConnector {

    constructor() {

        this.init();
    }

    init() {
        throw new Error('__abstract_not_implemented__');
    }

    getView() {
        return (<div></div>);
    }



}