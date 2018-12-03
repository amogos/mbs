import React from 'react';
import { View, Button } from 'react-native';
import Banner from './components/banner';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: '' };
    this.onBannerButtonClicked = this.onBannerButtonClicked.bind(this);
  }

  onBannerButtonClicked(selection) {
    this.setState({ screen: { selection } });
  }

  showAllBooks() {
    return (
      <View>
        <Banner callback={this.onBannerButtonClicked} />
        <ShowAllBooksScreen />
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
    if (this.state.selection == 'search')
      return this.showAllBooks();
    else if (this.state.selection == 'add')
      return this.addNewBooks();
    else
      return this.showBlankPage();
  }
}



