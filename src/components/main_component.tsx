import React from 'react';
import * as ActionTypes from '../constants/tree_actions_constants';
import ListBooksContainer from '../containers/list_books_container';
import AddNewBookContainer from '../containers/add_new_book_container';
import NotificationsContainer from '../containers/notifications_component_container';

interface Props {
    action: string;
}

const MainComponent = (props: Props) => {
    if (props.action === ActionTypes.ACTION_LIST_BOOKS) {
        return <ListBooksContainer />;
    } else if (props.action === ActionTypes.ACTION_GOTO_ADD_BOOK || props.action === ActionTypes.ACTION_ADD_BOOK)
        return <AddNewBookContainer />;
    else if (props.action === ActionTypes.ACTION_GOTO_NOTIFICATIONS) return <NotificationsContainer />;
    else return null;
};

export default MainComponent;
