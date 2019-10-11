import * as ActionConstants from './../../shared/constants/action_constant';

const { PageActionConstant } = ActionConstants.default;

const dispatchCacher = store => next => action => {
    let filters = sessionStorage.getItem('filters');

    switch (action.type) {
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            {
                if (
                    filters &&
                    filters.ACTION_GOTO_LIST_BOOKS &&
                    filters.ACTION_GOTO_LIST_BOOKS === JSON.stringify(action.filters.sort())
                ) {
                    return store.getState();
                } else {
                    if (!filters) {
                        filters = {};
                    }
                    if (!filters.ACTION_GOTO_LIST_BOOKS) {
                        filters = { ...filters, ACTION_GOTO_LIST_BOOKS: '' };
                    }
                    filters.ACTION_GOTO_LIST_BOOKS = JSON.stringify(action.filters.sort());
                    sessionStorage.setItem('filters', filters);
                }
            }
            break;
    }

    return next(action);
};

export default dispatchCacher;
