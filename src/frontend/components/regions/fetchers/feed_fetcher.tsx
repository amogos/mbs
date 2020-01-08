import React from 'react';
import UserFeedBig from '../../../containers/user_feed_container_big';
import ContentFetcher from './content_fetcher';
import * as DataTypes from '../../../../shared/types';

export default class FeedFetcher extends ContentFetcher {
    render(): JSX.Element {
        return <UserFeedBig />;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applyQueryFilters(urlparams: DataTypes.UrlParms): string[] {
        return [];
    }
}
