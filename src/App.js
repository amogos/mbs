import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase'
import EventBus from 'react-native-event-bus'
import Banner from './components/banner';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';

var booksArray = [];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: '' };
    this.userData = null;
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
        booksArray.push({ id: item.key, value: item.val() });
      })
    });
  }

  componentDidMount() {
    EventBus.getInstance().addListener("onBookAsignedToMe", this.listener = data => {
      this.onBookAsignedToMe(data);
    });
    EventBus.getInstance().addListener("onBookRemoved", this.listener = data => {
      this.onBookRemoved(data);
    });
    EventBus.getInstance().addListener("onFacebookConnect", this.listener = data => {
      this.onFacebookConnect(data);
    });
    EventBus.getInstance().addListener("onBannerButtonClicked", this.listener = data => {
      this.onBannerButtonClicked(data);
    });
    EventBus.getInstance().addListener("onNewBookAdded", this.listener = data => {
      this.onNewBookAdded(data);
    });
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  showAllBooks() {
    return (
      <View>
        <Banner />
        <ShowAllBooksScreen items={booksArray} userdata={this.userData} />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner />
        <AddNewBookScreen userdata={this.userData} />
      </View>
    );
  }

  showBlankPage() {
    return (
      <View>
        <Banner />
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

  onContentChanged() {
    this.setState(this.state)
  }

  onBookAsignedToMe(data) {
    let bookKey = data.param;
    let newHolder = { holder: { name: this.userData.name, email: this.userData.email } }
    firebase.database().ref().child('books').child(bookKey).update(newHolder, () => {
      var match = booksArray.find(function (item) {
        return item.id === bookKey;
      });
      match.value.holder = newHolder.holder;
      this.onContentChanged();
    });
  }

  onBookRemoved(data) {
    let bookKey = data.param;
    firebase.database().ref().child('books').child(bookKey).remove(() => {
      booksArray = booksArray.filter(function (item) {
        return (item.id !== bookKey);
      });
      this.onContentChanged();
    });
  }

  onFacebookConnect(data) {
    this.userData = data.param;
  }

  onBannerButtonClicked(data) {
    this.setState({ screen: data.param });
  }

  onNewBookAdded(data) {
    firebase.database().ref().child('books').push().set({
      author: data.param.author,
      holder: { name: "", email: "" },
      image: data.param.image,
      language: data.param.language,
      owner: {
        name: this.userData.name,
        email: this.userData.email
      },
      title: data.param.title
    });
  }
}
