import React from 'react';
import ListBooksContainer from '../../containers/list_books_container';
import SpaceContainer from '../../containers/list_spaces_container';
import { withStyle, requiresLogin } from '../aux_component';
import * as DataTypes from './../../../shared/types';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: any;
}

const MainComponent = (props: Props) => {
    window.scrollTo(0, 0);

    if (props.urlparams.id === 'books') {
        return <ListBooksContainer />;
    } else if (props.urlparams.id === 'spaces') {
        return <SpaceContainer />;
    } else {
        return <SpaceContainer />;
    }
};

export default requiresLogin(withStyle(MainComponent, 'main_component'));
