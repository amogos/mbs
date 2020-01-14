import CacheHandler from './cache_handler';
import QueryCache from './query_cache';
import { pageAction } from './../actions';
import * as DataTypes from './../../shared/types';
import * as ActionConstants from './../../shared/constants/action_constant';

const { PageActionConstant, BookActionConstant } = ActionConstants.default;

export default class BooksCacheHandler extends CacheHandler {
    booksCache = new QueryCache(10);

    public handle(store: any, action: any, next: any): any {
        switch (action.type) {
            case BookActionConstant.ACTION_ADD_BOOK:
                this.booksCache.invalidate();
                break;
            case BookActionConstant.ACTION_LIKE_BOOK:
                this.booksCache.invalidate();
                break;
            case PageActionConstant.ACTION_GOTO_LIST_BOOKS:
                {
                    const cacheKey = this.getCacheKey(action);
                    const cacheEntry = this.booksCache.getEntry(cacheKey);
                    if (cacheEntry) {
                        return store.dispatch(pageAction.refreshState({ booksArray: cacheEntry.value, append: true }));
                    } else {
                        action.callbacks.push((books: DataTypes.BookRecordType[]) => {
                            this.booksCache.addEntry(cacheKey, [...books]);
                        });
                    }
                }
                break;
        }
        return next(action);
    }
}
