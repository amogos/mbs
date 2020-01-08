import * as ActionConstants from './../../shared/constants/action_constant';
import QueryCache from './query_cache';
import { pageAction } from './../actions';
const { PageActionConstant, BookActionConstant } = ActionConstants.default;

const bookCache = new QueryCache(10);
const feedCache = new QueryCache(10);
let bookmarksCache = [];

const buildCacheKey = action => {
    let cacheKey = '';
    if (action.filters) {
        action.filters.forEach(element => (cacheKey = cacheKey + element));
    }
    return cacheKey;
};

const dispatchCacher = store => next => action => {
    switch (action.type) {
        case BookActionConstant.ACTION_ADD_BOOK:
            bookCache.invalidate();
            break;
        case BookActionConstant.ACTION_LIKE_BOOK:
            bookCache.invalidate();
            break;
        case BookActionConstant.ACTION_BOOKMARK_BOOK:
            bookmarksCache = [];
            break;
        case BookActionConstant.ACTION_UNBOOKMARK_BOOK:
            bookmarksCache = [];
            break;
        case PageActionConstant.ACTION_GET_BOOKMARKS:
            if (bookmarksCache.length > 0) {
                return store.dispatch(pageAction.refreshState({ userBookmarks: bookmarksCache, append: false }));
            } else {
                action.callbacks.push(bookmarks => (bookmarksCache = bookmarks));
            }
            break;
        case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
            const cacheKey = buildCacheKey(action);
            const cacheEntry = bookCache.getEntry(cacheKey);
            if (cacheEntry) {
                return store.dispatch(pageAction.refreshState({ booksArray: cacheEntry.value, append: true }));
            } else {
                action.callbacks.push(books => {
                    bookCache.addEntry(cacheKey, [...books]);
                });
            }
            break;
        case PageActionConstant.ACTION_GOTO_LIST_FEED:
            {
                const cacheKey = buildCacheKey(action);
                const cacheEntry = feedCache.getEntry(cacheKey);
                if (cacheEntry) {
                    return store.dispatch(pageAction.refreshState({ userfeed: cacheEntry.value, append: true }));
                } else {
                    action.callbacks.push(feeds => {
                        feedCache.addEntry(cacheKey, [...feeds]);
                    });
                }
            }
            break;
        default:
            break;
    }

    return next(action);
};

export default dispatchCacher;
