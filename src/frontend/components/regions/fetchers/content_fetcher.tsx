import React from 'react';
import * as DataTypes from '../../../../shared/types';

export interface ContentHolder {
    getContentHolder(): any[];
}

export default abstract class ContentFetcher {
    index: number;
    limit: number;
    refobject: React.RefObject<HTMLDivElement>;
    queryRunner: (filters: string[]) => void;

    constructor(index: number, limit: number, querryRunner: (filters: string[]) => void) {
        this.index = index;
        this.limit = limit;
        this.queryRunner = querryRunner;
        this.refobject = React.createRef<HTMLDivElement>();
    }

    abstract applyQueryFilters(urlparams: DataTypes.UrlParms): string[];

    protected render(): JSX.Element {
        return <div ref={this.refobject} />;
    }

    private IsDivMarkerInView() {
        if (!this.refobject.current) return false;
        const top = this.refobject.current.getBoundingClientRect().top;
        return top && top >= 0 && top <= window.innerHeight;
    }

    public next(urlparams: DataTypes.UrlParms, force: boolean, parent: ContentHolder) {
        const contentHolder = parent.getContentHolder();
        const endOfConentReached = contentHolder != null && contentHolder.length < this.index;
        if ((this.IsDivMarkerInView() && !endOfConentReached) || force) {
            const queryFilters: string[] = this.applyQueryFilters(urlparams);
            queryFilters.push(`_start=${this.index}`);
            queryFilters.push(`_limit=${this.limit}`);
            this.index += this.limit;
            this.refobject = React.createRef<HTMLDivElement>();
            this.queryRunner(queryFilters);
        }
    }
}
