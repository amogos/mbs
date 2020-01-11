import React from 'react';
import ListSpacesContainer from '../../../containers/list_spaces_container';
import ContentFetcher from './content_fetcher';
import * as DataTypes from '../../../../shared/types';
import { Aux } from './../../hooks/hooks';

export default class SpacesFetcher extends ContentFetcher {
    render(): JSX.Element {
        return (
            <Aux>
                <ListSpacesContainer />
                {super.render()}
            </Aux>
        );
    }
    applyQueryFilters(urlparams: DataTypes.UrlParms): string[] {
        return [];
    }
}
