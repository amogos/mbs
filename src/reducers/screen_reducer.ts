import * as Types from "../types";
import {
    ADD_BOOK,
    LIST_BOOKS,
    SHOW_BLANK
} from '../constants/action_constant'

const initialState = [
    {
        text: SHOW_BLANK,
        completed: false,
        id: 0,
        counter: 0,
        userdata: Types.nullUser
    }
]

export default function screens(state = initialState, action: any) {
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
