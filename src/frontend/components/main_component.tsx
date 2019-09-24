import React from 'react';
import * as ActionTypes from '../../shared/constants/action_constant';
import ListBooksContainer from '../containers/list_books_container';
import NotificationsContainer from '../containers/notifications_component_container';
import SpaceContainer from '../containers/spaces_container';

interface Props {
    action: string;
}

const { PageActionConstant } = ActionTypes.default;

const MainComponent = (props: Props) => {
    if (props.action === PageActionConstant.ACTION_LIST_BOOKS || props.action === PageActionConstant.ACTION_ADD_BOOK) {
        return <ListBooksContainer />;
    } else if (props.action === PageActionConstant.ACTION_GOTO_NOTIFICATIONS) {
        return <NotificationsContainer />;
    } else if (props.action === PageActionConstant.ACTION_GOTO_SPACES) {
        return <SpaceContainer />;
    } else return null;
};

export default MainComponent;
