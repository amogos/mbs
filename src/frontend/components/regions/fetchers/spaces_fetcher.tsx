import React from 'react';
import debounce from 'lodash.debounce';
import ListSpacesContainer from '../../../containers/list_spaces_container';
import ContentFetcher from './content_fetcher';

export default class SpacesFetcher extends ContentFetcher {
    render(): JSX.Element {
        window.onscroll = debounce(() => this.next(false), 100);
        this.next(false);
        return <ListSpacesContainer />;
    }
    prepareQueryFilters(): string[] {
        return [];
    }
}
