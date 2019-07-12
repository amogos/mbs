import * as ActionConstants from '../constants/social_actions_constants';
import * as DataTypes from '../types';
import * as Actions from '../actions/social_actions';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import { handleError } from './tree_reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case ActionConstants.ACTION_LOGIN_USER: {
            databseInstance.getUser(action.user, handleError).then((result: DataTypes.UserRecordType) => {
                Store.dispatch(Actions.addUserData(result));
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_LOGIN_USER,
            });
        }
        case ActionConstants.ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata,
            });
        default:
            return state;
    }
}
