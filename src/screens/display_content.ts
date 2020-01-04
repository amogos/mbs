import { DisplayBook } from './display_book';
import { DisplayBookListing } from './display_book_listing';
import { DisplaySpaceListing } from './display_space_listing';
import { DisplayProfileSettings } from './display_profile_settings';
import { PageNotFound } from '../frontend/components/errors/page_not_found';
import * as DataTypes from '../shared/types';

export const DisplayContent = (page: DataTypes.AppPages) => {
    switch (page) {
        case 'book':
            return DisplayBook();
        case 'books':
            return DisplayBookListing();
        case 'spaces':
            return DisplaySpaceListing();
        case 'settings':
            return DisplayProfileSettings();
        case undefined:
            return DisplaySpaceListing();
        default:
            return PageNotFound();
    }
};
