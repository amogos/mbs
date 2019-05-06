import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import EventBus from '../utils/event_bus'
import * as Types from "../types";

interface Props {
  userdata: Types.UserType;
}
interface State {
}

export default class AddNewBookComponent extends React.Component<Props, State> {
  defaultImage: string;
  currentBook: Types.BookValueType;

  constructor(props: Props) {
    super(props);
    this.defaultImage = 'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959';
    this.currentBook = {
      title: "",
      author: "",
      language: "",
      image: this.defaultImage,
      owner: this.props.userdata,
      holder: this.props.userdata
    };
    this.state = { text: 'error...' };
    this.onSaveButtonPressed = this.onSaveButtonPressed.bind(this);
  }

  onSaveButtonPressed() {
    EventBus.getInstance().fireEvent("onNewBookAdded", this.currentBook);
    this.currentBook.title = this.currentBook.author = this.currentBook.language = "";
    this.setState(this.state);
  }

  render() {
    return (
      <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text> title: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.currentBook.title = text; }}
          value={this.currentBook.title} />
        <Text> language: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.currentBook.language = text; }}
          value={this.currentBook.language} />
        <Text> author: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.currentBook.author = text; }}
          value={this.currentBook.author} />
        <Text> image: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.currentBook.image = text; }}
          value={this.currentBook.image} />
        <img src={this.currentBook.image} alt="new" width={64} height={64} />
        <Button color="#000000"
          onPress={this.onSaveButtonPressed}
          title="Save"
          accessibilityLabel="Save book" />

      </View>
    )
  }
}
const styles = StyleSheet.create({
  inputField: {
    height: 34,
    width: 320,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 2,
    borderRadius: 6
  },
})