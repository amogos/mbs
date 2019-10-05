import React from 'react';
import * as ActionTypes from '../../../shared/constants/action_constant';
import ListBooksContainer from '../../containers/list_books_container';
import SpaceContainer from '../../containers/list_spaces_container';
import { withStyle, requiresLogin } from '../aux_component';
import * as DataTypes from './../../../shared/types';

interface Props {
    page: string;
    userdata: DataTypes.UserRecordType;
}

const { PageActionConstant } = ActionTypes.default;

const MainComponent = (props: Props) => {
    window.scrollTo(0, 0);
    if (props.page === PageActionConstant.ACTION_GOTO_LIST_BOOKS) {
        return <ListBooksContainer />;
    } else if (props.page === PageActionConstant.ACTION_GOTO_SPACES) {
        return <SpaceContainer />;
    } else {
        return <SpaceContainer />;
    }
};

export default requiresLogin(withStyle(MainComponent, 'main_component'), null);
