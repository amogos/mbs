import React from 'react';
import ListSpacesContainer from '../../../containers/list_spaces_container';
import ContentFetcher from './content_fetcher';
import * as DataTypes from '../../../../shared/types';

export default class SpacesFetcher extends ContentFetcher {
    render(): JSX.Element {
        return <ListSpacesContainer />;
    }
    applyQueryFilters(urlparams: DataTypes.UrlParms): string[] {
        return [];
    }
}
