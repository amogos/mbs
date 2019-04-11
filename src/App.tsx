import React from 'react';
import { View } from 'react-native';
import EventBus from './utils/event_bus'
import Banner from './components/banner_component';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';
import Strings from './constants/string_constant';
import ConfirmationDialog from './components/dialogs/confirmation_dialog';
import * as Types from "./types";

export default class App extends React.Component<any, any> {
  userData: Types.UserType;
  dbConnector: any;
  booksArray: Array<Types.BookRecordType>;
  listener: (data: any) => void;

  constructor(props: any) {
    super(props);
    this.state = { screen: '', counter: 0 };
    this.userData = { name: "", email: "" };
    this.dbConnector = this.props.dbconnector;
    this.booksArray = [];
    this.listener = (data: any) => { };
  }

  componentDidMount() {
    EventBus.getInstance().addListener("onBookAsigned", this.listener = data => {
      this.onBookAsigned(data);
    });
    EventBus.getInstance().addListener("onBookReturned", this.listener = data => {
      this.onBookReturned(data);
    });
    EventBus.getInstance().addListener("onBookRemoved", this.listener = data => {
      this.onBookRemoved(data);
    });
    EventBus.getInstance().addListener("onSocialConnect", this.listener = data => {
      this.onSocialConnect(data);
    });
    EventBus.getInstance().addListener("onBannerButtonClicked", this.listener = data => {
      this.onBannerButtonClicked(data);
    });
    EventBus.getInstance().addListener("onNewBookAdded", this.listener = data => {
      this.onNewBookAdded(data);
    });
    this.dbConnector.getBooks((books: any) => this.booksArray = books);
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  showAllBooks() {
    return (
      <View>
        <Banner {...this.props} />
        <ShowAllBooksScreen items={this.booksArray} userdata={this.userData} counter={this.state.counter} />
        <ConfirmationDialog />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner {...this.props} />
        <AddNewBookScreen userdata={this.userData} />
        <ConfirmationDialog />
      </View>
    );
  }

  showBlankPage() {
    return (
      <View>
        <Banner {...this.props} />
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
    this.setState({ counter: this.state.counter + 1 });
  }

  onBookAsigned(data: Types.BookKeyType) {
    var onCompleteCallback = (bookKey: Types.BookKeyType, newHolder: Types.UserType) => {
      var match = this.booksArray.find(function (item: Types.BookRecordType) {
        return item.id === data.id;
      }) as unknown as Types.BookRecordType;
      match.value.holder = newHolder;
      this.reload();
    }
    this.dbConnector.assignBook(data, this.userData, onCompleteCallback);
  }

  onBookReturned(data: Types.BookKeyType) {
    var match = this.booksArray.find(function (item: Types.BookRecordType) {
      return item.id === data.id;
    }) as unknown as Types.BookRecordType;

    var onCompleteCallback = (bookKey: Types.BookKeyType, newHolder: Types.UserType) => {
      match.value.holder = newHolder;
      this.reload();
    }
    this.dbConnector.assignBook(data, match.value.owner, onCompleteCallback);
  }

  onBookRemoved(data: Types.BookKeyType) {
    var onCompleteCallback = (bookKey: Types.BookKeyType) => {
      this.booksArray = this.booksArray.filter(function (item: Types.BookRecordType) {
        return (item.id !== bookKey.id);
      });
      this.reload();
      EventBus.getInstance().fireEvent("onOperationCompleted", {
        param: { message: Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM }
      })
    }
    this.dbConnector.deleteBook(data, onCompleteCallback);
  }

  onSocialConnect(data: Types.UserType) {
    this.userData = data;
    this.reload();
  }

  onBannerButtonClicked(data: { param: string }) {
    this.setState({ screen: data.param });
  }

  onNewBookAdded(data: Types.BookValueType) {
    var onCompleteCallback = (newEntry: Types.BookValueType, bookKey: Types.BookKeyType) => {
      EventBus.getInstance().fireEvent("onOperationCompleted", {
        param: { message: Strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM }
      })
      this.booksArray.push({ id: bookKey.id, value: newEntry } as Types.BookRecordType);
    }
    this.dbConnector.addBook(data, onCompleteCallback);
  }
}
