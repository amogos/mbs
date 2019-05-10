import React from 'react';
import * as ActionTypes from '../constants/action_constant'
import ListBooksContainer from '../containers/list_books_container';
import AddNewBookContainer from '../containers/add_new_book_container';

interface Props {
  action: string
}

const MainComponent = (props: Props) => {
  if (props.action === ActionTypes.ACTION_LIST_BOOKS) {
    return <ListBooksContainer />;
  } else if (props.action === ActionTypes.ACTION_GOTO_ADD_BOOK || props.action === ActionTypes.ACTION_ADD_BOOK)
    return <AddNewBookContainer />;
  else
    return null;
}

export default MainComponent;
