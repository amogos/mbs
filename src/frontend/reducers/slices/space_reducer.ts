import * as ActionConstants from '../../../shared/constants/action_constant';
import databseInstance from './../../../backend/database_instance';
import { handleError, handleSuccess } from './../main_reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function spaceReducer(state: any, action: any): any {
    switch (action.type) {
        case ActionConstants.default.SpaceActionConstant.FOLLOW_SPACE: {
            databseInstance.followSpace(state.userdata, action.spaceId, action.callback, handleError, handleSuccess);
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.FOLLOW_SPACE,
            });
        }

        default:
            return null;
    }
}
