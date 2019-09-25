import * as ActionTypes from '../../../shared/constants/action_constant';

class PageAction {
    public followSpace = (spaceId: number) => ({ type: ActionTypes.default.SpaceActionConstant.FOLLOW_SPACE, spaceId });
}

export default PageAction;
