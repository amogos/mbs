import * as ActionTypes from '../../../shared/constants/action_constant';

class PageAction {
    public gotoSpaces = () => ({ type: ActionTypes.default.PageActionConstant.ACTION_GOTO_SPACES });

    public getBooks = (filters: string[]) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_GOTO_LIST_BOOKS,
        filters,
    });

    public refreshState = (append: any) => ({
        type: ActionTypes.default.PageActionConstant.ACTION_REFRESH_STATE,
        append,
    });
}

export default PageAction;
