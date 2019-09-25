import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { spaceAction } from './../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../../store';
import { GlobalVars, handleError } from './../main_reducer';

const { SpaceActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function spaceReducer(state: any, action: any): any {
    switch (action.type) {
        case ActionConstants.default.SpaceActionConstant.FOLLOW_SPACE: {
            databseInstance.followSpace(state.userdata, action.spaceId, handleError);
            return state;
        }

        default:
            return null;
    }
}
