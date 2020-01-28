import * as ActionConstants from '../../../shared/constants/action_constant';
import databseInstance from './../../../backend/database_instance';
import { handleError } from './../main_reducer';
import * as Action from '../../actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function spaceReducer(state: any, payload: Action.SpaceAction): any {
    switch (payload.type) {
        case ActionConstants.default.SpaceActionConstant.SUBSCRIBE_SPACE: {
            const action: Action.SubscribeSpaceAction = payload as Action.SubscribeSpaceAction;
            databseInstance.subscribeSpace(
                state.userdata,
                action.spaceId,
                handleError,
                action.onSuccess,
                action.onFail,
            );
            return Object.assign({}, state, {
                action: action.type,
            });
        }
        case ActionConstants.default.SpaceActionConstant.UNSUBSCRIBE_SPACE: {
            const action: Action.UnSubscribeSpaceAction = payload as Action.UnSubscribeSpaceAction;
            databseInstance.unsubscribeSpace(
                state.userdata,
                action.spaceId,
                handleError,
                action.onSuccess,
                action.onFail,
            );
            return Object.assign({}, state, {
                action: action.type,
            });
        }

        default:
            return null;
    }
}
