import React from 'react';
import { View } from 'react-native';
import md5 from "react-native-md5";

import Banner from './components/banner';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';
import UserData from './components/user_data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: '' };
    this.books = [{}];
    this.onBannerButtonClicked = this.onBannerButtonClicked.bind(this);
    this.onFacebookConnect = this.onFacebookConnect.bind(this);
    this.userData = null;
  }

  onFacebookConnect(response) {
    let hex_md5v = md5.hex_md5(response.name + response.email);
    this.userData = new UserData(response.name, response.email, response.image);
  }

  onBannerButtonClicked(selection) {
    if (selection === ShowAllBooksScreen.screenId) {
      this.books = [{
        title: 'The Secret Language of Cats: How to Understand Your Cat for a Better, Happier Relationship', language: 'English', author: 'Susanne Schotz',
        image: 'https://images-eu.ssl-images-amazon.com/images/I/51UkIlAOwEL._SY90_.jpg',
        owner: 'Florin Mogos',
        holder: ''
      },
      {
        title: 'Game Programming Patterns', language: 'English', author: 'Robert Nystrom',
        image: 'https://images-eu.ssl-images-amazon.com/images/I/51Pes1Vls5L._SY90_.jpg',
        owner: 'Iulia Mogos',
        holder: ''
      }];
    }
    this.setState({ screen: selection });
  }

  showAllBooks() {
    return (
      <View>
        <Banner onClicked={this.onBannerButtonClicked} onConnect={this.onFacebookConnect} />
        <ShowAllBooksScreen apiData={this.books} userdata={this.userData} />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner onClicked={this.onBannerButtonClicked} onConnect={this.onFacebookConnect} />
        <AddNewBookScreen userdata={this.userData} />
      </View>
    );
  }

  showBlankPage() {
    return (
      <View>
        <Banner onClicked={this.onBannerButtonClicked} onConnect={this.onFacebookConnect} />
      </View>
    );
  }

  render() {
    if (this.state.screen === ShowAllBooksScreen.screenId)
      return this.showAllBooks();
    else if (this.state.screen === AddNewBookScreen.screenId)
      return this.addNewBooks();
    else
      return this.showBlankPage();
  }
}
