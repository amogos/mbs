import React from 'react';
import ListBooksContainer from '../../../containers/list_books_container';
import ContentFetcher from './content_fetcher';
import * as DataTypes from '../../../../shared/types';
import { Aux } from './../../hooks/hooks';

export default class BooksFetcher extends ContentFetcher {
    render(): JSX.Element {
        return (
            <Aux>
                <ListBooksContainer />
                {super.render()}
            </Aux>
        );
    }
    applyQueryFilters(urlparams: DataTypes.UrlParms): string[] {
        const queryFilters: string[] = [];
        const { cid, sid } = urlparams.query;

        if (cid) {
            queryFilters.push(`category=${cid}`);
        }

        if (sid) {
            queryFilters.push(`space=${sid}`);
        }

        return queryFilters;
    }
}
