import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { socialAction } from './../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../../store';
import { GlobalVars, handleError } from './../main_reducer';

const { SocialActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state: any, action: any): any {
    switch (action.type) {
        case ActionConstants.default.SocialActionConstant.ACTION_LOGIN_USER: {
            databseInstance
                .getUserRecordTypeFromValueType(action.user, handleError)
                .then((result: DataTypes.UserRecordType) => {
                    Store.dispatch(socialAction.addUserData(result));
                });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_LOGIN_USER,
            });
        }
        case SocialActionConstant.ACTION_USER_DATA:
            databseInstance.getUserSpaces(action.userdata, handleError).then((result: DataTypes.SpaceType[]) => {
                GlobalVars.spacesArrays.userSpaces = result;
            });
            databseInstance.getOtherSpaces(action.userdata, handleError).then((result: DataTypes.SpaceType[]) => {
                GlobalVars.spacesArrays.otherSpaces = result;
            });
            return Object.assign({}, state, {
                userdata: action.userdata,
            });
        default:
            return null;
    }
}
