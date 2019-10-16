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
    getBooks(filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
}

function propsEqual(prevProps: Props, nextProps: Props) {
    return nextProps.urlparams === prevProps.urlparams;
}

function nextBooks(props: Props, force: boolean) {
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

        const index = props.booksArray.length > 0 ? props.booksArray[props.booksArray.length - 1].id + 1 : 0;
        queryFilters.push(`_start=${index}`);

        const limit = 50;
        queryFilters.push(`_limit=${limit}`);

        props.getBooks(queryFilters, []);
    }
}

const MainComponent = React.memo((props: Props) => {
    window.scrollTo(0, 0);

    if (props.urlparams.id === 'books') {
        window.onscroll = debounce(() => nextBooks(props, false), 100);
        nextBooks(props, true);
        return <ListBooksContainer />;
    }

    return <ListSpacesContainer />;
}, propsEqual);

export default requiresLogin(withStyle(MainComponent, 'main_component'));
