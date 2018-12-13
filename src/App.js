import React from 'react';
import { View } from 'react-native';
import Banner from './components/banner';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: '' };
    this.books = [{}];
    this.onBannerButtonClicked = this.onBannerButtonClicked.bind(this);
  }

  onBannerButtonClicked(selection) {
    if (selection === ShowAllBooksScreen.screenId) {
      this.books = [{
        title: 'The Secret Language of Cats: How to Understand Your Cat for a Better, Happier Relationship', language: 'English', author: 'Susanne Schotz',
        image: 'https://images-eu.ssl-images-amazon.com/images/I/51UkIlAOwEL._SY90_.jpg'
      },
      {
        title: 'Game Programming Patterns', language: 'English', author: 'Robert Nystrom',
        image: 'https://images-eu.ssl-images-amazon.com/images/I/51Pes1Vls5L._SY90_.jpg'
      }];
    }
    this.setState({ screen: selection });
  }

  showAllBooks() {
    return (
      <View>
        <Banner callback={this.onBannerButtonClicked} />
        <ShowAllBooksScreen apiData={this.books} />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner callback={this.onBannerButtonClicked} />
        <AddNewBookScreen />
      </View>
    );
  }

  showBlankPage() {
    return (
      <View>
        <Banner callback={this.onBannerButtonClicked} />
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



