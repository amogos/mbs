import * as ActionConstants from '../constants/action_constant';
import * as DataTypes from '../types';
import * as Actions from '../actions/social_actions';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import { handleError } from './tree_reducer';

const { SocialActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case ActionConstants.default.SocialActionConstant.ACTION_LOGIN_USER: {
            databseInstance.getUser(action.user, handleError).then((result: DataTypes.UserRecordType) => {
                Store.dispatch(Actions.addUserData(result));
            });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_LOGIN_USER,
            });
        }
        case SocialActionConstant.ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata,
            });
        default:
            return state;
    }
}
