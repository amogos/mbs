import React from 'react';
import { View } from 'react-native'
import ScreenAddNewBook from './screens/add_new_book_screen';
import AddNewBookScreen from './screens/add_new_book_screen';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AddNewBookScreen />
      </View>

    );
  }
}

