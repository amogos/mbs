import React from 'react';
import { View } from 'react-native';
import * as ActionTypes from '../constants/action_constant'
import EventBus from '../utils/event_bus'
import BannerContainer from '../containers/banner_container';
import ListBooksContainer from '../containers/list_books_container';
import AddNewBookComponent from './add_new_book_component';
import ConfirmationDialog from './dialogs/confirmation_dialog';
import * as DataTypes from "../types";

const MainComponent = (props: any) => {
  EventBus.getInstance().addListener("onSocialConnect", (data: DataTypes.UserType) => {
    props.addUserData(data);
    props.querryBooksListing();
  });
  if (props.screen === ActionTypes.ACTION_LIST_BOOKS)
    return showAllBooks(props);
  else if (props.screen === ActionTypes.ACTION_ADD_BOOK)
    return addNewBooks(props);
  else
    return showBlankPage(props);
}

const showAllBooks = (props: any) => {
  return (
    <View>
      <BannerContainer />
      <ListBooksContainer />
      <ConfirmationDialog />
    </View>
  );
}

const addNewBooks = (props: any) => {
  return (
    <View >
      <BannerContainer />
      <AddNewBookComponent userdata={props.userdata} />
      <ConfirmationDialog />
    </View>
  );
}

const showBlankPage = (props: any) => {
  return (
    <View>
      <BannerContainer />
    </View>
  );
}

export default MainComponent;
/*
export default class App extends React.Component<Props, State> {
  booksArray: Array<Types.BookRecordType>;
  listener: (data: any) => void;
  appContext: Types.Context;
  reloadCallback: () => void;

  constructor(props: Props) {
    super(props);
    this.state = { screen: '', counter: 0 };
    this.booksArray = [];
    this.listener = (data: any) => { };
    this.reloadCallback = () => { this.setState({ counter: this.state.counter + 1 }); };

    const nullUser = { name: "", email: "" } as Types.UserType;

    this.appContext = {
      dbconnector: props.dbconnector,
      userdata: nullUser,
      socialconnector: props.socialconnector
    };
  }

  componentDidMount() {
    EventBus.getInstance().addListener("onBookAsigned", this.listener = data => {
      const command = new AssignBookCommand(data, this.booksArray).init(this.appContext);
      command.execute(this.reloadCallback);
    });
    EventBus.getInstance().addListener("onBookReturned", this.listener = data => {
      const command = new ReturnBookCommand(data, this.booksArray).init(this.appContext);
      command.execute(this.reloadCallback);
    });
    EventBus.getInstance().addListener("onBookRemoved", this.listener = data => {
      const command = new RemoveBookCommand(data, this.booksArray).init(this.appContext);
      command.execute(this.reloadCallback);
    });
    EventBus.getInstance().addListener("onSocialConnect", this.listener = data => {
      this.onSocialConnect(data);
    });
    EventBus.getInstance().addListener("onBannerButtonClicked", this.listener = data => {
      this.onBannerButtonClicked(data);
    });
    EventBus.getInstance().addListener("onNewBookAdded", this.listener = data => {
      const command = new AddNewBookCommand(data, this.booksArray).init(this.appContext);
      command.execute();
    });
    this.appContext.dbconnector.getBooks((books: Array<Types.BookRecordType>) => this.booksArray = books);
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  showAllBooks() {
    return (
      <View>
        <Banner dbconnector={this.props.dbconnector} socialconnector={this.props.socialconnector} />
        <ShowAllBooksScreen items={this.booksArray} userdata={this.appContext.userdata} counter={this.state.counter} />
        <ConfirmationDialog />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner dbconnector={this.props.dbconnector} socialconnector={this.props.socialconnector} />
        <AddNewBookScreen userdata={this.appContext.userdata} />
        <ConfirmationDialog />
      </View>
    );
  }

  showBlankPage() {
    return (
      <View>
        <Banner dbconnector={this.props.dbconnector} socialconnector={this.props.socialconnector} />
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

  onSocialConnect(data: Types.UserType) {
    this.appContext.userdata = data;
    this.reloadCallback();
  }

  onBannerButtonClicked(data: { param: string }) {
    this.setState({ screen: data.param });
  }
}*/
