import * as ActionConstants from './../../shared/constants/action_constant';
import QueryCache from './query_cache';

const { PageActionConstant } = ActionConstants.default;

let bookCache = new QueryCache(10);

const dispatchCacher = store => next => action => {
    let cacheKey = '';

    if (action.filters) {
        action.filters.forEach(element => (cacheKey = cacheKey + element));
    }

    switch (action.type) {
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            {
                const cacheEntry = bookCache.getEntry(cacheKey);

                if (cacheEntry) {
                    return Object.assign({}, store.getState(), {
                        action: PageActionConstant.ACTION_GOTO_LIST_BOOKS,
                    });
                } else {
                    action.callbacks.push(books => {
                        bookCache.addEntry(cacheKey, books);
                    });
                }
            }
            break;
    }

    return next(action);
};

export default dispatchCacher;
