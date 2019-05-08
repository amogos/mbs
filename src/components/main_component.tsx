import React from 'react';
import { View } from 'react-native';
import * as ActionTypes from '../constants/action_constant'
import BannerContainer from '../containers/banner_container';
import ListBooksContainer from '../containers/list_books_container';
import AddNewBookContainer from '../containers/add_new_book_container';
import ConfirmationDialogContainer from '../containers/confirmation_dialog_container';


const MainComponent = (props: any) => {
  if (props.action === ActionTypes.ACTION_LIST_BOOKS) {
    return showAllBooks(props);
  } else if (props.action === ActionTypes.ACTION_GOTO_ADD_BOOK || props.action === ActionTypes.ACTION_ADD_BOOK)
    return addNewBooks(props);
  else
    return showBlankPage(props);
}

const showAllBooks = (props: any) => {
  return (
    <View>
      <BannerContainer />
      <ListBooksContainer />
      <ConfirmationDialogContainer />
    </View>
  );
}

const addNewBooks = (props: any) => {
  return (
    <View >
      <BannerContainer />
      <AddNewBookContainer />
      <ConfirmationDialogContainer />
    </View>
  );
}

const showBlankPage = (props: any) => {
  return (
    <View>
      <BannerContainer />
    </View>
  );
}

export default MainComponent;
