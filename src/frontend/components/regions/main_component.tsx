import React from 'react';
import ListBooksContainer from '../../containers/list_books_container';
import ListSpacesContainer from '../../containers/list_spaces_container';
import { withStyle, requiresLogin } from '../aux_component';
import * as DataTypes from './../../../shared/types';
import debounce from 'lodash.debounce';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    getBooks(filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
}

function propsEqual(prevProps: Props, nextProps: Props) {
    return nextProps.urlparams === prevProps.urlparams;
}

function prepareBooksListing(props: Props) {
    const queryFilters: string[] = [];

    if (props.urlparams.query.category) {
        queryFilters.push(`category=${props.urlparams.query.category}`);
    }
    if (props.urlparams.query.space) {
        queryFilters.push(`space=${props.urlparams.query.space}`);
    }

    props.getBooks(queryFilters, []);
}

function streamBooks(props: Props) {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        prepareBooksListing(props);
    }
}

const MainComponent = React.memo((props: Props) => {
    window.scrollTo(0, 0);

    if (props.urlparams.id === 'books') {
        window.onscroll = debounce(() => streamBooks(props), 100);
        prepareBooksListing(props);
        return <ListBooksContainer />;
    }

    return <ListSpacesContainer />;
}, propsEqual);

export default requiresLogin(withStyle(MainComponent, 'main_component'));
