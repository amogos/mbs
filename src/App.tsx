import React from 'react';
import { View } from 'react-native';
import EventBus from './utils/event_bus'
import Banner from './components/banner_component';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';
import ConfirmationDialog from './components/dialogs/confirmation_dialog';
import * as Types from "./types";
import DatabaseConnector from './connectors/database_connector';
import SocialConnector from './connectors/social_connector';
import AddNewBookCommand from './commands/add_newbook_command'
import RemoveBookCommand from './commands/remove_book_command';

interface Props {
  dbconnector: DatabaseConnector;
  socialconnector: SocialConnector;
}
interface State {
  screen: string;
  counter: number;
}

export default class App extends React.Component<Props, State> {
  userData: Types.UserType;
  dbConnector: DatabaseConnector;
  booksArray: Array<Types.BookRecordType>;
  listener: (data: any) => void;

  constructor(props: Props) {
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
      const command = new RemoveBookCommand(data, this.booksArray).init({ dbconnector: this.props.dbconnector } as Types.Context);
      command.execute(() => {
        this.reload();
      });
    });
    EventBus.getInstance().addListener("onSocialConnect", this.listener = data => {
      this.onSocialConnect(data);
    });
    EventBus.getInstance().addListener("onBannerButtonClicked", this.listener = data => {
      this.onBannerButtonClicked(data);
    });
    EventBus.getInstance().addListener("onNewBookAdded", this.listener = data => {
      const command = new AddNewBookCommand(data, this.booksArray).init({ dbconnector: this.props.dbconnector } as Types.Context);
      command.execute();
    });
    this.dbConnector.getBooks((books: Array<Types.BookRecordType>) => this.booksArray = books);
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  showAllBooks() {
    return (
      <View>
        <Banner dbconnector={this.props.dbconnector} socialconnector={this.props.socialconnector} />
        <ShowAllBooksScreen items={this.booksArray} userdata={this.userData} counter={this.state.counter} />
        <ConfirmationDialog />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner dbconnector={this.props.dbconnector} socialconnector={this.props.socialconnector} />
        <AddNewBookScreen userdata={this.userData} />
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

  reload() {
    this.setState({ counter: this.state.counter + 1 });
  }

  onBookAsigned(data: Types.BookKeyType) {
    var onCompleteCallback = () => {
      var match = this.booksArray.find(function (item: Types.BookRecordType) {
        return item.id === data.id;
      }) as unknown as Types.BookRecordType;
      match.value.holder = this.userData;
      this.reload();
    }
    this.dbConnector.assignBook(data, this.userData, onCompleteCallback);
  }

  onBookReturned(data: Types.BookKeyType) {
    var match = this.booksArray.find(function (item: Types.BookRecordType) {
      return item.id === data.id;
    }) as unknown as Types.BookRecordType;

    var onCompleteCallback = () => {
      match.value.holder = match.value.owner;
      this.reload();
    }
    this.dbConnector.assignBook(data, match.value.owner, onCompleteCallback);
  }

  onSocialConnect(data: Types.UserType) {
    this.userData = data;
    this.reload();
  }

  onBannerButtonClicked(data: { param: string }) {
    this.setState({ screen: data.param });
  }
}
