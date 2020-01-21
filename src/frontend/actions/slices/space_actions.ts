import * as ActionTypes from '../../../shared/constants/action_constant';

class SpaceAction {
    public subscribeSpace = (spaceId: number, callback: () => void) => ({
        type: ActionTypes.default.SpaceActionConstant.SUBSCRIBE_SPACE,
        spaceId,
        callback,
    });
    public unfollowSpace = (spaceId: number, callback: () => void) => ({
        type: ActionTypes.default.SpaceActionConstant.UNSUBSCRIBE_SPACE,
        spaceId,
        callback,
    });
}

export default SpaceAction;
