import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase'
import Banner from './components/banner';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';
import UserData from './components/user_data';

var booksArray = [];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: '' };
    this.context = {
      userData: {},
      callbacks: {
        onBookAsignedToMe: this.onBookAsignedToMe.bind(this),
        onBookRemoved: this.onBookRemoved.bind(this),
        onFacebookConnect: this.onFacebookConnect.bind(this),
        onBannerButtonClicked: this.onBannerButtonClicked.bind(this),
        onNewBookAdded: this.onNewBookAdded.bind(this)
      }
    }
    firebase.initializeApp({
      apiKey: "AIzaSyB2MXouZ3ICc9kuyp9FszyA6hVV7SFRX1I",
      authDomain: "mybooksshelve.firebaseapp.com",
      databaseURL: "https://mybooksshelve.firebaseio.com",
      projectId: "mybooksshelve",
      storageBucket: "mybooksshelve.appspot.com",
      messagingSenderId: "627289196388"
    });
    firebase.database().ref().child('books').once('value').then(function (snapshot) {
      snapshot.forEach(item => {
        booksArray.push({ key: item.key, value: item.val() });
      })
    });
  }

  showAllBooks() {
    return (
      <View>
        <Banner context={this.context} />
        <ShowAllBooksScreen items={booksArray} context={this.context} />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner context={this.context} />
        <AddNewBookScreen context={this.context} />
      </View>
    );
  }

  showBlankPage() {
    return (
      <View>
        <Banner context={this.context} />
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

  onBookAsignedToMe() {

  }

  onBookRemoved(bookKey) {
    alert(bookKey);
  }

  onFacebookConnect(response) {
    this.userData = new UserData(response.name, response.email, response.image);
  }

  onBannerButtonClicked(selection) {
    this.setState({ screen: selection });
  }

  onNewBookAdded(bookFormData) {
    firebase.database().ref().child('books').push().set({
      author: bookFormData.author,
      holder: { name: "", email: "" },
      image: bookFormData.image,
      language: bookFormData.language,
      owner: {
        name: this.userData.name,
        email: this.userData.email
      },
      title: bookFormData.title
    });
  }
}
