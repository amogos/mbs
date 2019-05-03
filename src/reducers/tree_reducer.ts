import * as Types from "../types";
import {
    ADD_BOOK,
    LIST_BOOKS,
    SHOW_BLANK,
    USER_DATA
} from '../constants/action_constant'

import FirebaseConnector from '../connectors/firebase_connector'
import FacebookConnector from '../connectors/facebook_connector'


var databaseConnector = new FirebaseConnector()
var socialConnector = new FacebookConnector()


const initialState = {
    screen: SHOW_BLANK,
    counter: 0,
    id: 0,
    dbconnector: databaseConnector,
    socialconnector: socialConnector
}


export default function tree(state = initialState, action: any) {
    switch (action.type) {
        case ADD_BOOK:
            return state;
        case LIST_BOOKS:
           return state;
        case USER_DATA:
            let test =  Object.assign({}, state, {
                userdata: action.userdata
            })
            alert(JSON.stringify(test))
            return test;

        default:
            return state;
    }
}
