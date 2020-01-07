import * as DataTypes from '../../../../shared/types';

export default abstract class ContentFetcher {
    index: number;
    limit: number;
    queryRunner: (filters: string[]) => void;

    constructor(index: number, limit: number, querryRunner: (filters: string[]) => void) {
        this.index = index;
        this.limit = limit;
        this.queryRunner = querryRunner;
    }

    abstract applyQueryFilters(urlparams: DataTypes.UrlParms): string[];
    abstract render(): JSX.Element;

    public next(urlparams: DataTypes.UrlParms, force: boolean) {
        const pageIndex = this.index / this.limit + 1;
        const endOfContent = document.documentElement.scrollTop >= window.innerHeight * pageIndex;

        if (endOfContent || force) {
            const queryFilters: string[] = this.applyQueryFilters(urlparams);
            queryFilters.push(`_start=${this.index}`);
            queryFilters.push(`_limit=${this.limit}`);
            this.index += this.limit;
            this.queryRunner(queryFilters);
        }
    }
}
