import React from 'react';
import ListBooksContainer from '../../../containers/list_books_container';
import ContentFetcher from './content_fetcher';
import * as DataTypes from '../../../../shared/types';

export default class BooksFetcher extends ContentFetcher {
    render(): JSX.Element {
        return <ListBooksContainer />;
    }
    applyQueryFilters(urlparams: DataTypes.UrlParms): string[] {
        const queryFilters: string[] = [];
        const { category, space } = urlparams.query;

        if (category) {
            queryFilters.push(`category=${category}`);
        }

        if (space) {
            queryFilters.push(`space=${space}`);
        }

        return queryFilters;
    }
}
