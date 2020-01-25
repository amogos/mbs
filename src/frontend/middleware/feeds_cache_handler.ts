import CacheHandler from './cache_handler';
import QueryCache from './query_cache';
import { pageAction } from './../actions';
import * as DataTypes from './../../shared/types';

export default class FeedsCacheHandler extends CacheHandler {
    feedCache = new QueryCache(10);

    public handle(store: any, action: any, next: any): any {
        const cacheKey = this.getCacheKey(action);
        const cacheEntry = this.feedCache.getEntry(cacheKey);
        if (cacheEntry) {
            return store.dispatch(
                pageAction.refreshState({
                    userFeed: cacheEntry.value,
                    append: this.shouldAppend(action),
                }),
            );
        } else {
            action.callbacks.push((feeds: DataTypes.UserFeedRecordType[]) => {
                this.feedCache.addEntry(cacheKey, [...feeds]);
            });
        }
        return next(action);
    }

    public invalidate(): void {
        this.feedCache.invalidate();
    }
}
