import * as Types from "../types";
import {
    ADD_BOOK,
    LIST_BOOKS,
    SHOW_BLANK
} from '../constants/action_constant'

import FirebaseConnector from '../connectors/firebase_connector'
import FacebookConnector from '../connectors/facebook_connector'


var databaseConnector = new FirebaseConnector()
var socialConnector = new FacebookConnector()


const initialState = [{
    screen: SHOW_BLANK,
    counter: 0,
    id: 0,
    userdata: Types.nullUser,
    dbconnector: databaseConnector,
    socialconnector: socialConnector
}
]

export default function tree(state = initialState, action: any) {
    switch (action.type) {
        case ADD_BOOK:
            return state.map(stage =>
                stage.id === action.id ?
                    { ...stage, text: action.text } : stage);
        case LIST_BOOKS:
            return state.map(stage =>
                stage.id === action.id ?
                    { ...stage, text: action.text } : stage);
        default:
            return state;
    }
}
