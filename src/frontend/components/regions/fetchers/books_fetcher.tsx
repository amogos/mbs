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
