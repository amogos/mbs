import * as ActionTypes from '../../../shared/constants/action_constant';

class SpaceAction {
    public followSpace = (spaceId: number, callback: () => void) => ({
        type: ActionTypes.default.SpaceActionConstant.FOLLOW_SPACE,
        spaceId,
        callback,
    });
    public unfollowSpace = (spaceId: number, callback: () => void) => ({
        type: ActionTypes.default.SpaceActionConstant.UNFOLLOW_SPACE,
        spaceId,
        callback,
    });
}

export default SpaceAction;
