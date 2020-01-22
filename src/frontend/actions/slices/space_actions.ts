import * as ActionTypes from '../../../shared/constants/action_constant';

class SpaceAction {
    public enterSubscribeSpace = (spaceId: number) => ({
        type: ActionTypes.default.SpaceActionConstant.ENTER_SUBSCRIBE,
        spaceId,
    });
    public subscribeSpace = (spaceId: number, onSuccess?: () => void, onFail?: () => void) => ({
        type: ActionTypes.default.SpaceActionConstant.SUBSCRIBE_SPACE,
        spaceId,
        onSuccess,
        onFail,
    });
    public unsubscribeSpace = (spaceId: number, onSuccess?: () => void, onFail?: () => void) => ({
        type: ActionTypes.default.SpaceActionConstant.UNSUBSCRIBE_SPACE,
        spaceId,
        onSuccess,
        onFail,
    });
    public exitSubscribeSpace = (spaceId: number) => ({
        type: ActionTypes.default.SpaceActionConstant.EXIT_SUBSCRIBE,
        spaceId,
    });
}

export default SpaceAction;
