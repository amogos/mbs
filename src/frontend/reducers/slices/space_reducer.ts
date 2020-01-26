import * as ActionConstants from '../../../shared/constants/action_constant';
import databseInstance from './../../../backend/database_instance';
import { handleError } from './../main_reducer';
import * as Action from '../../actions';
import * as DataTypes from './../../../shared/types';
import Store from '../store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function spaceReducer(state: any, payload: Action.SpaceActionType): any {
    switch (payload.type) {
        case ActionConstants.default.SpaceActionConstant.ENTER_SUBSCRIBE: {
            const action: Action.EnterSubscribeSpaceAction = payload as Action.EnterSubscribeSpaceAction;
            databseInstance.getSpace(action.spaceId, handleError).then((result: DataTypes.SpaceType) => {
                Store.dispatch(Action.refreshState({ subscribingSpace: result, append: false }));
            });
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.ENTER_SUBSCRIBE,
            });
        }
        case ActionConstants.default.SpaceActionConstant.SUBSCRIBE_SPACE: {
            const action: Action.SubscribeSpaceAction = payload as Action.SubscribeSpaceAction;
            databseInstance.subscribeSpace(
                state.userdata,
                state.subscribingSpace,
                handleError,
                action.onSuccess,
                action.onFail,
            );
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.SUBSCRIBE_SPACE,
            });
        }
        case ActionConstants.default.SpaceActionConstant.UNSUBSCRIBE_SPACE: {
            const action: Action.UnSubscribeSpaceAction = payload as Action.UnSubscribeSpaceAction;
            databseInstance.unsubscribeSpace(
                state.userdata,
                state.unsubscribingSpace,
                handleError,
                action.onSuccess,
                action.onFail,
            );
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.UNSUBSCRIBE_SPACE,
            });
        }

        case ActionConstants.default.SpaceActionConstant.EXIT_SUBSCRIBE: {
            Action.removeKey('subscribingSpace');
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.UNSUBSCRIBE_SPACE,
            });
        }

        default:
            return null;
    }
}
