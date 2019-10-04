import React from 'react';
import * as ActionTypes from '../../../shared/constants/action_constant';
import ListBooksContainer from '../../containers/list_books_container';
import NotificationsContainer from '../../containers/notifications_component_container';
import SpaceContainer from '../../containers/list_spaces_container';
import { withStyle } from '../aux_component';

interface Props {
    page: string;
}

const { PageActionConstant } = ActionTypes.default;

const MainComponent = (props: Props) => {
    window.scrollTo(0, 0);
    if (props.page === PageActionConstant.ACTION_GOTO_LIST_BOOKS) {
        return <ListBooksContainer />;
    } else if (props.page === PageActionConstant.ACTION_GOTO_NOTIFICATIONS) {
        return <NotificationsContainer />;
    } else if (props.page === PageActionConstant.ACTION_GOTO_SPACES) {
        return <SpaceContainer />;
    } else {
        return <SpaceContainer />;
    }
};

export default withStyle(MainComponent, 'main_component');
