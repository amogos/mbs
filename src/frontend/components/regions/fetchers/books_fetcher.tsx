import React from 'react';
import debounce from 'lodash.debounce';
import ListBooksContainer from '../../../containers/list_books_container';
import ContentFetcher from './content_fetcher';

export default class BooksFetcher extends ContentFetcher {
    render(): JSX.Element {
        window.onscroll = debounce(() => this.next(false), 100);
        this.next(false);
        return <ListBooksContainer />;
    }
    prepareQueryFilters(): string[] {
        const queryFilters: string[] = [];
        const { category, space } = this.urlparams.query;

        if (category) {
            queryFilters.push(`category=${category}`);
        }

        if (space) {
            queryFilters.push(`space=${space}`);
        }

        return queryFilters;
    }
}
