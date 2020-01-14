export default abstract class CacheHandler {
    protected getCacheKey = (action: any) => {
        let cacheKey = '';

        if (!action.filters) {
            return cacheKey;
        }

        action.filters.forEach((element: string) => (cacheKey = cacheKey + element));
        return cacheKey;
    };

    protected shouldAppend(action: any): boolean {
        const append = (action.filters as string[]).includes('_start=0') === false;
        return append;
    }

    public abstract handle(store: any, action: any, next: any): any;
}
