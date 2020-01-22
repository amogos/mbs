import * as ActionConstants from '../../../shared/constants/action_constant';
import databseInstance from './../../../backend/database_instance';
import { handleError } from './../main_reducer';
import { pageAction } from '../../actions';
import * as DataTypes from './../../../shared/types';
import Store from '../store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function spaceReducer(state: any, action: any): any {
    switch (action.type) {
        case ActionConstants.default.SpaceActionConstant.ENTER_SUBSCRIBE: {
            databseInstance.getSpace(action.spaceId, handleError).then((result: DataTypes.SpaceType) => {
                Store.dispatch(pageAction.refreshState({ subscribingSpace: result, append: false }));
            });
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.ENTER_SUBSCRIBE,
            });
        }
        case ActionConstants.default.SpaceActionConstant.SUBSCRIBE_SPACE: {
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
            databseInstance.unsubscribeSpace(state.userdata, action.spaceId, handleError);
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.UNSUBSCRIBE_SPACE,
            });
        }

        case ActionConstants.default.SpaceActionConstant.EXIT_SUBSCRIBE: {
            pageAction.removeKey('subscribingSpace');
            return Object.assign({}, state, {
                action: ActionConstants.default.SpaceActionConstant.UNSUBSCRIBE_SPACE,
            });
        }

        default:
            return null;
    }
}
