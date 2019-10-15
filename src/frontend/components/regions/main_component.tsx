import React, { useState } from 'react';
import ListBooksContainer from '../../containers/list_books_container';
import ListSpacesContainer from '../../containers/list_spaces_container';
import { withStyle, requiresLogin } from '../aux_component';
import * as DataTypes from './../../../shared/types';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    getBooks(filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
}

function propsEqual(prevProps: Props, nextProps: Props) {
    return nextProps.urlparams === prevProps.urlparams;
}

const MainComponent = React.memo((props: Props) => {
    window.scrollTo(0, 0);

    if (props.urlparams.id === 'books') {
        const queryFilters = [`category=${props.urlparams.query.category}`];
        props.getBooks(queryFilters, []);
        return <ListBooksContainer />;
    }

    return <ListSpacesContainer />;
}, propsEqual);

export default requiresLogin(withStyle(MainComponent, 'main_component'));
