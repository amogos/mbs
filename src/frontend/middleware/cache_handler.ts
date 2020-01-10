export default abstract class CacheHandler {
    protected buildCacheKey = (action: any) => {
        let cacheKey = '';
        if (!action.filters) {
            return cacheKey;
        }

        action.filters.forEach((element: string) => (cacheKey = cacheKey + element));
        return cacheKey;
    };

    public abstract handle(store: any, action: any, next: any): any;
}
