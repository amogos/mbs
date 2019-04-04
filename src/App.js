import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase'
import EventBus from 'react-native-event-bus'
import Banner from './components/banner';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';
import strings from './constants/strings';
import ConfirmationDialog from './components/dialogs/confirmation_dialog';

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
        <ConfirmationDialog />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner />
        <AddNewBookScreen userdata={this.userData} />
        <ConfirmationDialog />
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

  reload() {
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
      this.reload();
    });
  }

  onBookRemoved(data) {
    let bookKey = data.param;
    firebase.database().ref().child('books').child(bookKey).remove(() => {
      booksArray = booksArray.filter(function (item) {
        return (item.id !== bookKey);
      });
      this.reload();
      EventBus.getInstance().fireEvent("onOperationCompleted", {
        param: { message: strings.MYBOOKSHELVE_STRING_BOOK_REMOVED, button1: strings.MYBOOKSHELVE_STRING_CONFIRM }
      })
    });
  }

  onFacebookConnect(data) {
    this.userData = data.param;
  }

  onBannerButtonClicked(data) {
    this.setState({ screen: data.param });
  }

  onNewBookAdded(data) {
    let newEntry = {
      author: data.param.author,
      holder: { name: "", email: "" },
      image: data.param.image,
      language: data.param.language,
      owner: {
        name: this.userData.name,
        email: this.userData.email
      },
      title: data.param.title
    };
    var ref = firebase.database().ref().child('books').push();
    var onCompleteCallback = () => {
      EventBus.getInstance().fireEvent("onOperationCompleted", {
        param: { message: strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED, button1: strings.MYBOOKSHELVE_STRING_CONFIRM }
      })
      booksArray.push({ id: ref.key, value: newEntry });
    }
    ref.set(newEntry, onCompleteCallback);
  }
}
