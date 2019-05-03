import {
    ADD_BOOK,
    LIST_BOOKS,
    SHOW_BLANK,
    USER_DATA
} from '../constants/action_constant'

import FirebaseConnector from '../connectors/firebase_connector'
import FacebookConnector from '../connectors/facebook_connector'

const initialState = {
    screen: SHOW_BLANK,
    dbconnector: new FirebaseConnector(),
    socialconnector: new FacebookConnector()
}

export default function tree(state = initialState, action: any) {
    switch (action.type) {
        case ADD_BOOK:
            return state;
        case LIST_BOOKS:
            return state;
        case USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata
            })
        default:
            return state;
    }
}
