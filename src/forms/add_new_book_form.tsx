import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import EventBus from 'react-native-event-bus'

export default class AddNewBookForm extends React.Component<any, any> {
  defaultImage: string;
  title: string;
  author: string;
  image: any;
  language:string;

  constructor(props: any) {
    super(props);
    this.defaultImage = 'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959';
    this.title = 'title';
    this.author ='author';
    this.image = this.defaultImage;
    this.language = '';
    this.state = { text: 'error...' };
    this.onSaveButtonPressed = this.onSaveButtonPressed.bind(this);
  }

  resetFields() {
    this.title = "";
    this.author = "";
    this.language = "";
    this.image.image = this.defaultImage;
    this.setState(this.state);
  }

  onSaveButtonPressed() {
    EventBus.getInstance().fireEvent("onNewBookAdded", {
      param: {
        title: this.title,
        author: this.author,
        language: this.language,
        image: this.image.image
      }
    });
    this.resetFields();
  }

  render() {
    return (
      <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text> title: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.title = text; }}
          value={this.title} />
        <Text> language: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.language = text; }}
          value={this.language} />
        <Text> author: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.author = text; }}
          value={this.author} />
        <Text> image: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.image.image = text; }}
          value={this.image.text} />
        <img src={this.image.image} alt="new" width={64} height={64}  />
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