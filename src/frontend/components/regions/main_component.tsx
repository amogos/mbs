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

function streamBooks(props: Props, force: boolean) {
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

        props.getBooks(queryFilters, []);
    }
}

const MainComponent = React.memo((props: Props) => {
    window.scrollTo(0, 0);

    if (props.urlparams.id === 'books') {
        window.onscroll = debounce(() => streamBooks(props, false), 100);
        streamBooks(props, true);
        return <ListBooksContainer />;
    }

    return <ListSpacesContainer />;
}, propsEqual);

export default requiresLogin(withStyle(MainComponent, 'main_component'));
