import CacheHandler from './cache_handler';
import QueryCache from './query_cache';
import { pageAction } from './../actions';
import * as DataTypes from './../../shared/types';

export default class SpacesCacheHandler extends CacheHandler {
    spacesCache = new QueryCache(10);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public handle(store: any, action: any, next: any): any {
        const cacheKey = this.getCacheKey(action);
        const cacheEntry = this.spacesCache.getEntry(cacheKey);

        if (cacheEntry) {
            return store.dispatch(
                pageAction.refreshState({
                    userSpaces: cacheEntry.value.userSpaces,
                    otherSpaces: cacheEntry.value.otherSpaces,
                    append: this.shouldAppend(action),
                }),
            );
        } else {
            action.callbacks.push((result: DataTypes.Spaces) => {
                this.spacesCache.addEntry(cacheKey, result);
            });
        }
        return next(action);
    }

    public invalidate(): void {
        this.spacesCache.invalidate();
    }
}
