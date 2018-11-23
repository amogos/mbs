import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BookForm from './components/BookForm';
import Banner from './components/Banner';

export default class App extends React.Component {
  render() {
    return (
      <View>
         <Banner/>
         <BookForm/>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
