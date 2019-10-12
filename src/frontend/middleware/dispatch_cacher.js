import * as ActionConstants from './../../shared/constants/action_constant';
import QueryCache from './query_cache';

const { PageActionConstant } = ActionConstants.default;

let bookCache = new QueryCache(10);

const cacheBookListing = (store, action, next) => {
    let cacheKey = '';
    action.filters.forEach(element => (cacheKey = cacheKey + element));
    const cacheEntry = bookCache.getEntry(cacheKey);

    if (cacheEntry) {
        return Object.assign({}, store.getState(), {
            action: PageActionConstant.ACTION_GOTO_LIST_BOOKS,
        });
    } else {
        bookCache.addEntry(cacheKey, null);
        return next(action);
    }
};

const dispatchCacher = store => next => action => {
    switch (action.type) {
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            return cacheBookListing(store, action, next);
    }

    return next(action);
};

export default dispatchCacher;
