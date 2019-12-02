import * as ActionConstants from './../../shared/constants/action_constant';
import QueryCache from './query_cache';
import { pageAction } from './../actions';
const { PageActionConstant, BookActionConstant } = ActionConstants.default;

const bookCache = new QueryCache(10);

const dispatchCacher = store => next => action => {
    let cacheKey = '';

    if (action.filters) {
        action.filters.forEach(element => (cacheKey = cacheKey + element));
    }

    switch (action.type) {
        case BookActionConstant.ACTION_ADD_BOOK:
            {
                bookCache.invalidate();
            }
            break;
        case BookActionConstant.ACTION_LIKE_BOOK:
            {
                bookCache.invalidate();
            }
            break;
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            {
                const cacheEntry = bookCache.getEntry(cacheKey);
                if (cacheEntry) {
                    return store.dispatch(
                        pageAction.refreshState({
                            booksArray: cacheEntry.value,
                            append: true,
                        }),
                    );
                } else {
                    action.callbacks.push(books => {
                        bookCache.addEntry(cacheKey, [...books]);
                    });
                }
            }
            break;
    }

    return next(action);
};

export default dispatchCacher;
