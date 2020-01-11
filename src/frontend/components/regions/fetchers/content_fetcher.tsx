import React from 'react';
import * as DataTypes from '../../../../shared/types';

export default abstract class ContentFetcher {
    index: number;
    limit: number;
    refobject: React.RefObject<HTMLDivElement>;
    refObjectPreviouslyInViewport: boolean;
    queryRunner: (filters: string[]) => void;

    constructor(index: number, limit: number, querryRunner: (filters: string[]) => void) {
        this.index = index;
        this.limit = limit;
        this.queryRunner = querryRunner;
        this.refobject = React.createRef<HTMLDivElement>();
        this.refObjectPreviouslyInViewport = false;
    }

    abstract applyQueryFilters(urlparams: DataTypes.UrlParms): string[];

    protected render(): JSX.Element {
        return <div ref={this.refobject} />;
    }

    private ShouldBringNewContent() {
        console.log('call');
        if (!this.refobject.current) return false;

        const top = this.refobject.current.getBoundingClientRect().top;
        console.log(`top = ${top}`);
        const refObjIsCurrentlyInViewport = top && top >= 0 && top <= window.innerHeight;
        if (this.refObjectPreviouslyInViewport === refObjIsCurrentlyInViewport) return false;
        return refObjIsCurrentlyInViewport;
    }

    public next(urlparams: DataTypes.UrlParms, force: boolean) {
        if (this.ShouldBringNewContent() || force) {
            console.log('in viewport');
            const queryFilters: string[] = this.applyQueryFilters(urlparams);
            queryFilters.push(`_start=${this.index}`);
            queryFilters.push(`_limit=${this.limit}`);
            this.index += this.limit;
            this.queryRunner(queryFilters);
            this.refObjectPreviouslyInViewport = true && !force;
        }
    }
}
