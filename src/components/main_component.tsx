import React from 'react';
import { View } from 'react-native';

import * as ActionTypes from '../constants/action_constant'

import EventBus from '../utils/event_bus'
import Banner from './banner_component';
import ShowAllBooksScreen from '../screens/show_all_books_screen';
import AddNewBookScreen from '../screens/add_new_book_screen';
import ConfirmationDialog from './dialogs/confirmation_dialog';
import * as Types from "../types";
import DatabaseConnector from '../connectors/database_connector';
import SocialConnector from '../connectors/social_connector';
import AddNewBookCommand from '../commands/add_newbook_command'
import RemoveBookCommand from '../commands/remove_book_command';
import AssignBookCommand from '../commands/assign_book_command';
import ReturnBookCommand from '../commands/return_book_command';

interface Props {
  dbconnector: DatabaseConnector;
  socialconnector: SocialConnector;
}

interface State {
  screen: string;
  counter: number;
}

var booksArray: Array<Types.BookRecordType>;

const MainComponent = (props: any) => {

  const { screen, counter, userdata, dbconnector, socialconnector } = props;

  if (screen === ActionTypes.LIST_BOOKS)
    return showAllBooks(props);
  else if (screen === ActionTypes.ADD_BOOK)
    return addNewBooks(props);
  else
    return showBlankPage(props);
}

const showAllBooks = (props: any) => {
  return (
    <View>
      <Banner dbconnector={props.dbconnector} socialconnector={props.socialconnector} />
      <ShowAllBooksScreen items={booksArray} userdata={props.userdata} counter={props.counter} />
      <ConfirmationDialog />
    </View>
  );
}

const addNewBooks = (props: any) => {
  return (
    <View >
      <Banner dbconnector={props.dbconnector} socialconnector={props.socialconnector} />
      <AddNewBookScreen userdata={props.userdata} />
      <ConfirmationDialog />
    </View>
  );
}

const showBlankPage = (props: any) => {
  return (
    <View>
      <Banner dbconnector={props.dbconnector} socialconnector={props.socialconnector} />
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
