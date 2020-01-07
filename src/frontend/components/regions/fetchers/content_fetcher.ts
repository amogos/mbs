import * as DataTypes from '../../../../shared/types';

export default abstract class ContentFetcher {
    index: number;
    limit: number;
    urlparams: DataTypes.UrlParms;
    queryRunner: (filters: string[]) => void;

    constructor(
        index: number,
        limit: number,
        urlparams: DataTypes.UrlParms,
        querryRunner: (filters: string[]) => void,
    ) {
        this.index = index;
        this.limit = limit;
        this.urlparams = urlparams;
        this.queryRunner = querryRunner;
    }

    abstract prepareQueryFilters(): string[];
    abstract render(): void;

    public next(force: boolean) {
        if (force) this.index = 0;

        const endOfContent =
            window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;

        if (endOfContent || force) {
            const queryFilters: string[] = this.prepareQueryFilters();
            queryFilters.push(`_start=${this.index}`);
            queryFilters.push(`_limit=${this.limit}`);
            this.index += this.limit;
            this.queryRunner(queryFilters);
        }
    }
}
