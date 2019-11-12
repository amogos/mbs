import React from 'react';
import ListBooksContainer from '../../containers/list_books_container';
import ListSpacesContainer from '../../containers/list_spaces_container';
import { withStyle, requiresLogin } from '../aux_component';
import * as DataTypes from './../../../shared/types';
import debounce from 'lodash.debounce';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    booksArray: DataTypes.BookRecordType[];
    userSpaces: DataTypes.SpaceType[];
    otherSpaces: DataTypes.SpaceType[];
    getBooks(filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
    getSpaces(filters: string[]): void;
}

interface Navigation {
    index: number;
    limit: number;
}

const navigation: Navigation = { index: 0, limit: 5 };

function propsEqual(prevProps: Props, nextProps: Props) {
    return nextProps.urlparams === prevProps.urlparams;
}

function nextBooks(props: Props, force: boolean) {
    if (force) navigation.index = 0;

    const endOfContent =
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;

    if (endOfContent || force) {
        const queryFilters: string[] = [];

        if (props.urlparams.query.category) {
            queryFilters.push(`category=${props.urlparams.query.category}`);
        }

        if (props.urlparams.query.space) {
            queryFilters.push(`space=${props.urlparams.query.space}`);
        }

        queryFilters.push(`_start=${navigation.index}`);
        queryFilters.push(`_limit=${navigation.limit}`);
        navigation.index += navigation.limit;
        props.getBooks(queryFilters, []);
    }
}

function BooksList(props: Props) {
    window.onscroll = debounce(() => nextBooks(props, false), 100);
    nextBooks(props, true);
    return <ListBooksContainer />;
}

function nextSpaces(props: Props, force: boolean) {
    if (force) navigation.index = 0;

    const endOfContent =
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;

    if (force || endOfContent) {
        const queryFilters: string[] = [];
        queryFilters.push(`_start=${navigation.index}`);
        queryFilters.push(`_limit=${navigation.limit}`);
        navigation.index += navigation.limit;
        props.getSpaces(queryFilters);
    }
}

function SpacesList(props: Props) {
    window.onscroll = debounce(() => nextSpaces(props, false), 100);
    nextSpaces(props, true);
    return <ListSpacesContainer />;
}

const MainComponent = React.memo((props: Props) => {
    window.scrollTo(0, 0);

    const { id } = props.urlparams;

    switch (id) {
        case 'books':
            return BooksList(props);
        default:
            return SpacesList(props);
    }
}, propsEqual);

export default requiresLogin(withStyle(MainComponent, 'main_component'));
