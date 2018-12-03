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

  shouldComponentUpdate() { 
    return true;
  }

  onBannerButtonClicked(selection) {
    if (selection === ShowAllBooksScreen.screenId) {
      this.books = [{title:'title1', author:'author1'}, {title:'title2', author:'author2'}];
    }
   
    this.setState({ screen: selection  });
  }

  showAllBooks() {
    return (
      <View>
        <Banner callback={this.onBannerButtonClicked}/>
        <ShowAllBooksScreen apiData={this.books}/>
      </View>
    );
  }

  addNewBooks() {
    return (
      <View>
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



