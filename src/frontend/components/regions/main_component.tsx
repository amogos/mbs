import React from 'react';
import ListBooksContainer from '../../containers/list_books_container';
import SpaceContainer from '../../containers/list_spaces_container';
import { withStyle, requiresLogin } from '../aux_component';
import * as DataTypes from './../../../shared/types';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: { id: string; query: { category: number } };
    gotoListBooks(filters: string[]): void;
}

function propsEqual(prevProps: Props, nextProps: Props) {
    return nextProps.urlparams === prevProps.urlparams;
}

const MainComponent = React.memo((props: Props) => {
    window.scrollTo(0, 0);
    if (props.urlparams.id === 'books') {
        const queryFilters = [`category=${props.urlparams.query.category}`];
        props.gotoListBooks(queryFilters);
        return <ListBooksContainer />;
    } else if (props.urlparams.id === 'spaces') {
        return <SpaceContainer />;
    } else {
        return <SpaceContainer />;
    }
}, propsEqual);

export default requiresLogin(withStyle(MainComponent, 'main_component'));
