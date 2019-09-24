import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';

class PageAction {
    public gotoSpaces = () => ({ type: ActionTypes.default.PageActionConstant.ACTION_GOTO_SPACES });

    public gotoListBooks = (filters: string[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GOTO_LIST_BOOKS,
        filters,
    });

    public listBooks = () => ({ type: ActionTypes.default.PageActionConstant.ACTION_LIST_BOOKS });

    public gotoNotifications = () => ({ type: ActionTypes.default.PageActionConstant.ACTION_GOTO_NOTIFICATIONS });
}

export default PageAction;
